// import discord authentication module in file
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// import passport module into this file
const passport = require('passport');

// import dotenv module in this file
require('dotenv').config();

// import database helper functions from ../database/index.js
const { getUser, addUser } = require('../../database/index');

// use passport serialize user middleware
passport.serializeUser((user, done) => {
  done(null, user);
});

// use passport deserialize user middleware
passport.deserializeUser((user, done) => {
  // console.log('********SERIALIZE USER**********', user);
  getUser(user) // connect function to db later
    .then((foundUser) => {
      if (foundUser) {
        done(null, foundUser);
      } else {
        console.log('no user with that id found');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  // done(null, user); // once function connected erase this done
});

// create new instance of passport Discord strategy
passport.use(new GoogleStrategy({
  // define the options to use with google strategy
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
((accessToken, refreshToken, profile, done) => {
  // deconstruct variables from profile object
  const { id, displayName } = profile;
  const userObj = {
    idDiscord: id,
    username: displayName,
    profilePhotoUrl: profile.photos[0].value,
  };
  getUser(userObj)
    .then((gotUser) => {
      if (gotUser) {
        done(null, gotUser);
      } else {
        addUser(userObj)
          .then((newUser) => {
            done(null, newUser);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

  // done(null, profile); // once db functions connected erase this done
)));
