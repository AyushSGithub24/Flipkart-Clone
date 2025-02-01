const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.Mail_CLIENT_ID,
  process.env.Mail_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: process.env.Mail_REFRESH_TOKEN,
});

// Function to get Access Token
const getAccessToken = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    return accessToken.token;
  } catch (error) {
    console.error("Failed to get access token:", error);
    throw new Error("Failed to get access token");
  }
};

// Function to create Transporter
const createTransporter = async () => {
  const accessToken = await getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.Mail_CLIENT_ID,
      clientSecret: process.env.Mail_CLIENT_SECRET,
      refreshToken: process.env.Mail_REFRESH_TOKEN,
    },
  });
};

// Function to send email
const sendEmail = async (emailOptions) => {
  try {
    const emailTransporter = await createTransporter();
    const result = await emailTransporter.sendMail(emailOptions);
    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};



module.exports={sendEmail}