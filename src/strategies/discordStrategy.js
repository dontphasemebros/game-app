// import discord authentication module in file
const DiscordStrategy = require('passport-discord').Strategy;

// import passport module into this file
const passport = require('passport');

// import database helper functions from ../database/index.js
const { getUser, addUser } = require('../../database/index');

// use passport serialize user middleware
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

// use passport deserialize user middleware
passport.deserializeUser((user, done) => {
  done(null, user);
  // getUser(id) // get user
  //   .then((user) => {
  //     if (user) {
  //       done(null, user);
  //     } else {
  //       console.log('no user with that id found');
  //     }
  //   })
  //   .catch((error) => {
  //     throw error;
  //   });
});

// create new instance of passport Discord strategy
passport.use(new DiscordStrategy({
  // define the options to use with discord strategy
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: process.env.DISCORD_CLIENT_REDIRECT,
  scope: ['identify', 'guilds'],
}, (accessToken, refreshToken, profile, done) => {
  getUser(profile.id)
    .then((user) => {
      if (user) {
        done(null, user);
      } else {
        addUser({
          id: profile.id,
          username: profile.username,
        })
          .then((newUser) => {
            newUser.save();
            done(null, newUser);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}));
