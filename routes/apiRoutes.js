// import axios module into file
const axios = require('axios');

// import express module into file
const express = require('express');

// create variable set to new Router instance from express module
const apiRouter = express.Router();

// API Routes
apiRouter.get('/', (req, res) => {
  res.send('API home route working');
});

// get route for GameSpot API
apiRouter.get('/articles', (req, res) => {
  axios.get('http://www.gamespot.com/api/articles/?api_key=fde1e9882be9081e1997cef52fed7c9eae5491c3&limit=10&filter=publish_date:2020-01-01%7C2020-12-31&sort=publish_date:desc&format=json')
    .then((articles) => {
      const { results } = articles.data;
      console.log(articles.data.results);
      res.send(results);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = apiRouter;
