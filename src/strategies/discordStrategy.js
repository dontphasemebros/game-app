// import discord authentication module in file
const DiscordStrategy = require('passport-discord').Strategy;

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
  getUser(user[0]) // get user
    .then((foundUser) => {
      if (foundUser.length) {
        done(null, foundUser);
      } else {
        console.log('no user with that id found');
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// create new instance of passport Discord strategy
passport.use(new DiscordStrategy({
  // define the options to use with discord strategy
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DEPLOY_REDIRECT || process.env.DISCORD_CLIENT_REDIRECT,
  scope: ['identify', 'guilds'],
}, (accessToken, refreshToken, profile, done) => {
  const userObj = {
    idDiscord: profile.id,
    username: profile.username,
    profilePhotoUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
    location: profile.locale,
  };
  getUser(userObj)
    .then((gotUser) => {
      if (gotUser.length) {
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
}));
