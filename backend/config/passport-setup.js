const { userModel } = require('../db');
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/google/redirect',
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract profile details
        const { id, displayName } = profile;
        const email=profile["emails"][0].value
        // Check if the user already exists
        let user = await userModel.findOne({ "$or": [ { email: email }, { googleId: id} ] });
        if (!user) {
          // Create a new user if not found
          user = await userModel.create({
            googleId: id,
            name: displayName,
            email
          });
        }
        console.log(user);
        done(null, user);
      } catch (err) {
        done(err, null); 
      }
    }
  )
);
