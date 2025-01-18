const express = require('express');
const passport = require('passport');
const Googlerouter = express.Router();

// Google OAuth route
Googlerouter.get('/google', passport.authenticate('google', { scope: ['email','profile'] }));



module.exports = { Googlerouter};
