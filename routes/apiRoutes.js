// import axios module into file
const axios = require('axios');

// import express module into file
const express = require('express');

// import passport module
const passport = require('passport');

// create variable set to new Router instance from express module
const apiRouter = express.Router();

// DISCORD API ROUTES
// discord app authentication route
apiRouter.get('/', passport.authenticate('discord'));

// create redirect route for discord authentication
apiRouter.get('/redirect', passport.authenticate('discord', {
  failureRedirect: '/forbidden',
  successRedirect: '/',
}), (req, res) => {
  res.send(req.user);
});

// GOOGLE API ROUTES
// google app authentication route
apiRouter.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// create redirect route for discord authentication
apiRouter.get('/callback', passport.authenticate('google', {
  failureRedirect: '/failed',
  successRedirect: '/',
}), (req, res) => {
  res.send(req.user);
});

// GET route for GameSpot API
apiRouter.get('/articles', (req, res) => {
  axios.get(`http://www.gamespot.com/api/articles/?api_key=${process.env.GAMESPOT_API_KEY}&limit=10&filter=publish_date:2020-01-01%7C2020-12-31&sort=publish_date:desc&format=json`)
    .then((articles) => {
      const { results } = articles.data;
      // console.log(articles.data.results);
      res.send(results);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = apiRouter;
