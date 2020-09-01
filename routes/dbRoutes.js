// import express module into file
const express = require('express');

// create variable set to new Router instance from express module
const dbRouter = express.Router();

// Database Routes - all routes prefixed with '/'

// GET routes
dbRouter.get('/users', (req, res) => {
  res.send('GET user DB route working');
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
  res.send('POST user route working');
});

module.exports = dbRouter;
