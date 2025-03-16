require("dotenv").config();
const jwt = require("jsonwebtoken");
function generateAccessToken(user){
    return  jwt.sign(
        { userId: user._id,userName:user.name},
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // Access token expires in 15 minutes
      );
}
const generateRefreshToken=(user)=> jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
        { expiresIn: "7d" } // Refresh token expires in 7 days
      );
module.exports={generateAccessToken,generateRefreshToken};