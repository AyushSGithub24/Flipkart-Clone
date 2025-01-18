const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");
const PORT = 3000;
const jwt = require("jsonwebtoken");
const passportSetup = require("./config/passport-setup");
const { router } = require("./routes/userRoutes");
const { Googlerouter } = require("./routes/authRoutes");
const { userModel } = require("./db");
async function main() {
  const app = express();
  // Middleware setup
  app.use(express.static(path.join(__dirname, "public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json()); // Added to parse JSON in body

  app.use(
    session({
      secret: process.env.CookieSecret,
      resave: false, // Don't save session if unmodified
      saveUninitialized: true, // Save session even if uninitialized
    })
  );

  app.use("/auth", Googlerouter);
  app.use("/", router);
  //google Callback route
  app.get(
    "/google/redirect",
    passport.authenticate("google", {
      session: false,
      failureRedirect: "/login",
    }),
    (req, res) => {
      const token = jwt.sign(
        { userId: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ message: "Login successful", token });
    }
  );

  // Protected Route
  app.get("/protected", authenticateToken, async (req, res) => {
    const { userId } = req;
    const user = await userModel.findOne({ _id: userId });
    if (user) {
      console.log("found" + user);
      let { email, name } = user;
      console.log(email + " " + name);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Access granted", user });
  });

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
function authenticateToken(req, res, next) {
  let token = req.headers.token;
  if (!token) return res.status(401).json({ message: "No token provided" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded=" + decoded);

  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in",
    });
  }
}
main();
