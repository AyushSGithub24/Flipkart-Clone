const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");
const PORT = 3000;
const jwt = require("jsonwebtoken");
const passportSetup = require("./config/passport-setup");
const { router } = require("./routes/userRoutes");
const { Googlerouter } = require("./routes/authRoutes");
const { productRouter}=require("./routes/productRoutes")
const {sellerRouter}=require("./routes/sellerRoutes")
const { userModel,productModel,sellerModel } = require("./db");
const { generateAccessToken, generateRefreshToken } = require("./token");
async function main() {
  const app = express();
  // Middleware setup
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.urlencoded({ extended: true }));
  // Allow requests from specific origin (frontend)
  app.use(
    cors({
      origin: "http://localhost:5173", // Frontend URL
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      credentials: true, // Allow cookies or authorization headers
    })
  );
  app.use(express.json()); // Added to parse JSON in body
  // Middleware to parse cookies
  app.use(cookieParser());
  //user route
  app.use("/", router);
  //google Callback route
  app.use("/auth", Googlerouter);
  // Google Callback route
  app.get(
    "/google/redirect",
    passport.authenticate("google", {
      session: false, // Disable session since we are using JWT tokens
      failureRedirect: "/login", // Redirect here if authentication fails
    }),
    async (req, res) => {
      try {
        // Generate JWT access token
        const user = req.user;
        const accessToken = generateAccessToken(user);
        // Generate JWT refresh token

        const refreshToken = generateRefreshToken(user);

        // Store the refresh token in the database (or Redis)
        user.refreshToken = refreshToken;
        await user.save();

        // Set the refresh token as an HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use HTTPS in production
          sameSite: "strict",
          path: "/refresh-token",
        });

        // Redirect the user to the frontend with the access token as part of the URL
        // Optionally, you can also append the token to the frontend URL as a query parameter
        res.redirect(`http://localhost:5173/oauth/?accessToken=${accessToken}`);
      } catch (err) {
        console.error("Error during Google OAuth:", err);
        res
          .status(500)
          .json({ message: "Error generating tokens", error: err.message });
      }
    }
  );
  app.use("/product",productRouter)
  app.use("/seller",sellerRouter);
  //connect DB
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
    });

  //start the server
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
}



main();
