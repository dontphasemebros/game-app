// import discord authentication module in file
const DiscordStrategy = require('passport-discord').Strategy;

// import passport module into this file
const passport = require('passport');

// import database helper functions from ../database/index.js
const { getUser, addUser } = require('../../database/index');

// use passport serialize user middleware
passport.serializeUser((user, done) => {
  // console.log('*******serialize user*******', user[0]);
  done(null, user);
});

// use passport deserialize user middleware
passport.deserializeUser((user, done) => {
  // console.log('*******deserialize user*******', user[0]);
  // const { id } = user[0];
  getUser(user[0].idDiscord) // get user
    .then((foundUser) => {
      if (foundUser.length) {
        // console.log('*****FOUND USER*******', foundUser);
        done(null, foundUser);
      } else {
        console.log('no user with that id found');
        // done(null, user);
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
  callbackURL: process.env.DISCORD_CLIENT_REDIRECT || process.env.DEPLOY_REDIRECT,
  scope: ['identify', 'guilds'],
}, (accessToken, refreshToken, profile, done) => {
  // console.log('*********PROFILE*********', profile); // the id is on the profile object
  const {
    id, username, avatar, locale,
  } = profile;
  getUser(id)
    .then((gotUser) => {
      // console.log('*******GOT USER*******', gotUser);
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
            // console.log('********NewUser********', newUser[0]);
            // const {id_discord, username, profile_photo_url, location } = newUser[0];
            // addUser({
            //   idDiscord: newUser[0].id_discord,
            //   username: newUser[0].username,
            //   profilePhotoUrl: newUser[0].profile_photo_url,
            //   location: newUser[0].location,
            // }); // newUser.save is not a function
            done(null, newUser);
          });
      }
    })
    .catch((error) => {
      throw error;
    });
}));
