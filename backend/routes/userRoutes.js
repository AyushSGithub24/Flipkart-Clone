const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { userModel } = require("../db");
const path = require("path");
const router = express.Router();
const { generateAccessToken, generateRefreshToken } = require("../token");
const {sendEmail}=require("../sendMail")
// Signup route
router.post("/signup", async (req, res) => {
  // Input validation using Zod
  const requiredBody = z.object({
    email: z.string().min(3).max(50).email("Invalid email format"),
    name: z.string().min(2).max(20, "Name must be between 2 and 20 characters"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20,{message: "Password must be less than 20 characters"})
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: "Password must contain at least one special character",
      })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  });
  
  const parsedData = requiredBody.safeParse(req.body);
  
  if (!parsedData.success) {
    // Organizing errors by field
    const fieldErrors = parsedData.error.issues.reduce((acc, issue) => {
      const field = issue.path[0]; // Get the field name
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(issue.message);
      return acc;
    }, {});

    return res.status(400).json({
      message: "Invalid credentials",
      errors: fieldErrors, // Grouped errors by field
    });
  }
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({ email, password: hashedPassword, name });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      // Handle duplicate email error (assuming email has a unique index in DB)
      return res.status(400).json({ message: "Email already in use" });
    }
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    // Optionally store the refresh token in the database (or Redis)
    user.refreshToken = refreshToken;
    await user.save();
    // Send the access token and set the refresh token in the cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict",
      path: "/refresh-token",
    });
    res.status(200).json({ accessToken });
    console.log(user);
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
});

// forget-password
router.post("/forget", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found. Redirect to signup." });
    }
    if (!user.password) {
      return res.status(401).json({ message: "User must log in with Google. Redirect to Google login." });
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Valid for 10 min
    await user.save();
    // Send Email
    await sendEmail({
      subject: "Reset Password OTP Flipkart",
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
      to: email,
      from: process.env.EMAIL,
    });
    return res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("Error in forget password route:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// verify otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await userModel.findOne({ email, resetPasswordOTP: otp, resetPasswordExpires: { $gt: Date.now() } });

  if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

  res.json({ message: 'OTP verified successfully' });
});

//reset password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  const user = await userModel.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword
  user.resetPasswordOTP = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
});



//refresh
router.post("/refresh-token", async (req, res) => {
  // console.log(req);
  const refreshToken = req.cookies?.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "refresh_secret"
    );
    const user = await userModel.findById(decoded.userId);
    console.log(user);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate a new access token
    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
});

//logout
router.post("/logout", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    const user = await userModel.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("refreshToken", { path: "/refresh-token" });
  res.status(200).json({ message: "Logged out successfully" });
});

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach user ID to request
    next(); // Move to next middleware
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please log in again." });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

//get address
router.get("/account/address",authenticateToken,async (req,res)=>{
  const uId=req.userId;
  try {
    const user=await userModel.findById(uId)
    if(!user){
      return res.status(403).json({
        message: "User not found",
      });
    }
    res.send(user.Address)
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      message: "An error occurred while retrieving user data",
    });
  }
})

// get Userdata
router.get("/account", authenticateToken, async (req, res) => {
  const uId = req.userId;
  try {
    const user = await userModel.findById(uId);
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }
    const selectedFields = ["email", "name", "phone", "gender"];
    // Filter out non-selected fields from the user object
    const filteredUser = {};
    for (let key in user.toObject()) {
      if (selectedFields.includes(key)) {
        filteredUser[key] = user[key];
      }
    }
    console.log(filteredUser); // Log the filtered user object
    res.send(filteredUser); // Send the filtered user object
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      message: "An error occurred while retrieving user data",
    });
  }
});
//update
router.put("/account", authenticateToken, async (req, res) => {
  const uId = req.userId;
  try {
    const user = await userModel.findById(uId);
    if (!user) {
      return res.status(403).json({
        message: "User not found",
      });
    }
    // Destructure fields from request body
    const { email, name, gender, phone } = req.body;
    // Update only the fields that are provided in the request
    if (email) user.email = email;
    if (name) user.name = name;
    if (gender) user.gender = gender;
    if (phone) user.phone = phone;
    // Save the updated user
    await user.save();
    console.log(user); // Log the updated user object
    res.status(200).json(user); // Return the updated user as response
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      message: "An error occurred while updating user data",
    });
  }
});
//update address
router.put("/account/address",authenticateToken,async (req,res)=>{
  const uId=req.userId;
  try {
    const user=await userModel.findById(uId)
    if(!user){
      return res.status(403).json({
        message: "User not found",
      });
    }
    const {Address}=req.body
    console.log(req.body.Address);
    user.Address=Address
    await user.save()
    res.sendStatus(200)
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({
      message: "An error occurred while retrieving user data",
    });
  }
})
router.delete("/account/delete",authenticateToken,async (req,res)=>{
  const uId=req.userId;
  try {
    const user=await userModel.findByIdAndDelete(uId)
    res.sendStatus(200)
  } catch (error) {
     console.error("Error retrieving user:", error);
    res.status(500).json({
      message: "An error occurred while Deleting user data",
    });
  }
})
module.exports = { router };
