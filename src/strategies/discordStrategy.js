// import discord authentication module in file
const DiscordStrategy = require('passport-discord').Strategy;

// import passport module into this file
const passport = require('passport');

// import database helper functions from ../database/index.js
const { getUser, addUser } = require('../../database/index');

// use passport serialize user middleware
passport.serializeUser((user, done) => {
  done(null, user);
});

// use passport deserialize user middleware
passport.deserializeUser((user, done) => {
  getUser(user[0].idDiscord) // get user
    .then((foundUser) => {
      if (foundUser.length) {
        done(null, foundUser);
      } else {
        console.log('no user with that id found');
      }
    })
    .catch((error) => {
      throw error;
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
  const {
    id, username, avatar, locale,
  } = profile;
  getUser(id)
    .then((gotUser) => {
      if (gotUser.length) {
        done(null, gotUser);
      } else {
        addUser({
          idDiscord: id,
          username,
          profilePhotoUrl: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
          location: locale,
        })
          .then((newUser) => {
            done(null, newUser);
          });
      }
    })
    .catch((error) => {
      throw error;
    });
}));
