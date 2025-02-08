const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { sellerModel } = require("../db");
const { generateAccessToken, generateRefreshToken } = require("../token");
const sellerRouter = express.Router();

sellerRouter.post("/register", async (req,res) => {
    const requiredBody = z.object({
        email: z.string().min(3).max(50).email("Invalid email format"),
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




  const { mobile, email, category, gstin, password } = req.body;
  if (!email || !mobile || !category || !email || !password || !gstin) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await sellerModel.create({
      email,
      mobile,
      category,
      gstin,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (err.code === 11000) {
      // Handle duplicate email error (assuming email has a unique index in DB)
      return res
        .status(400)
        .json({ message: "Email or Number already in use" });
    }
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

sellerRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      const user = await sellerModel.findOne({ email });
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
      res.cookie("SellerRefreshToken", refreshToken);
      res.status(200).json({ accessToken });
      console.log(user);
    } catch (err) {
      res.status(500).json({ message: "Error logging in", error: err.message });
    }
  });


// forget-password
sellerRouter.post("/forget", async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user exists
    const user = await sellerModel.findOne({ email });
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
sellerRouter.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await sellerModel.findOne({ email, resetPasswordOTP: otp, resetPasswordExpires: { $gt: Date.now() } });

  if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

  res.json({ message: 'OTP verified successfully' });
});

//reset password
sellerRouter.post('/reset-password', async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  const user = await sellerModel.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword
  user.resetPasswordOTP = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
});

//refresh

sellerRouter.post("/refresh-token", async (req, res) => {
  // console.log(req);
  const refreshToken = req.cookies?.SellerRefreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "refresh_secret"
    );
    const user = await sellerModel.findById(decoded.userId);
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
sellerRouter.post("/logout", async (req, res) => {
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



module.exports = { sellerRouter };
