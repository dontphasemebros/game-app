// import express module into file
const express = require('express');

// create variable set to new Router instance from express module
const dbRouter = express.Router();

// import database helper functions from ../database/index.js
const { getUser, addUser } = require('../database/index');

// Database Routes - all routes prefixed with '/'

// GET routes
dbRouter.get('/users', (req, res) => {
  console.log('*******REQ*******', req.body);
  const { id } = req.body;
  getUser(id)
    .then((foundUser) => {
      res.send(foundUser);
    })
    .catch((error) => {
      throw error;
    });
});

dbRouter.get('/threads', (req, res) => {
  res.send('GET threads DB route working');
});

dbRouter.get('/articles', (req, res) => {
  res.send('GET articles route working');
});

dbRouter.get('/scores', (req, res) => {
  res.send('GET game-scores route working');
});

// POST routes
dbRouter.post('/scores', (req, res) => {
  res.send('POST game-scores route working');
});

dbRouter.post('/threads', (req, res) => {
  res.send('POST threads route working');
});

dbRouter.post('/replies', (req, res) => {
  res.send('POST replies route working');
});

dbRouter.post('/users', (req, res) => {
  addUser();
  res.send('POST user route working');
});

module.exports = dbRouter;
