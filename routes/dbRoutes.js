// import express module into file
const express = require('express');

// create variable set to new Router instance from express module
const dbRouter = express.Router();

// import database helper functions from ../database/index.js
const {
  getUser,
  addUser,
  getThreads,
  addThread,
  addReply,
  getScores,
  addScore,
} = require('../database/index');

// Database Routes - all routes prefixed with '/'

// GET routes

/*
* route - retrieves specific user information when given a user id number
* use - uses "getUser" function to retrieve user information from DB
* inputs - "getUser" receives as user id number
* {Param} - id - deconstructed from req.body
* returns - an object of user information from DB
*/

dbRouter.get('/users', (req, res) => {
  const { idDiscord } = req.body;
  getUser(idDiscord)
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((error) => {
      throw error;
    });
});

dbRouter.get('/threads', (req, res) => {
  getThreads();
  res.send('GET threads DB route working');
});

// dbRouter.get('/articles', (req, res) => {
//   res.send('GET articles route working');
// });

dbRouter.get('/scores', (req, res) => {
  getScores();
  res.send('GET game-scores route working');
});

// POST routes
dbRouter.post('/scores', (req, res) => {
  addScore();
  res.send('POST game-scores route working');
});

dbRouter.post('/threads', (req, res) => {
  addThread();
  res.send('POST threads route working');
});

dbRouter.post('/replies', (req, res) => {
  addReply();
  res.send('POST replies route working');
});

/*
* route - adds new user information to the db
* use - uses "addUser" function to add new user information to DB
* inputs - "addUser" receives an object of user information:
*        userObj-- {}
* {Param} -
* returns -
*/

dbRouter.post('/users', (req, res) => {
  const {
    id, username, avatar, locale,
  } = req.body;
  const userObj = {
    idDiscord: id,
    username,
    profilePhotoUrl: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
    location: locale,
  };
  addUser(userObj)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = dbRouter;
