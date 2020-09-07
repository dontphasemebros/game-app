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
  console.log('USER IN DESERIALIZE: ', user);
  // getUser(user) // get user
  //   .then((foundUser) => {
  //     console.log('FOUND USER IN DESERIALIZE: ', foundUser);
  //     if (foundUser) {
  //       done(null, foundUser);
  //     } else {
  //       console.log('no user with that id found');
  //       // addUser(user)
  //       //   .then((addedUser) => {
  //       //     done(null, addedUser);
  //       //   })
  //       //   .catch((err) => console.error(err));
  //       done(null, user);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  done(null, user);
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
}));
