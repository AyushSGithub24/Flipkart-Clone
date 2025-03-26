require("dotenv").config();
const jwt = require("jsonwebtoken");
function generateAccessToken(user) {
  return jwt.sign(
    { userId: user._id, userName: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // Access token expires in 15 minutes
  );
}
const generateRefreshToken = (user) =>
  jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
    { expiresIn: "7d" } // Refresh token expires in 7 days
  );

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
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
};
