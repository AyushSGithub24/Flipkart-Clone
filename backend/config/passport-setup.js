const { userModel } = require('../db');
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// // Serialize user: Store user ID in the session
// passport.serializeUser((user, done) => {
//   done(null, user._id); // Use user._id if that's the MongoDB default
// });

// // Deserialize user: Fetch user from the database using the ID in the session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userModel.findById(id); // Await the database query
//     done(null, user); // Pass user object to req.user
//   } catch (err) {
//     done(err, null); // Pass error if any
//   }
// });

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
