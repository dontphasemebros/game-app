// import express module into file
const express = require('express');

// create variable set to new express instance
const app = express();

// set port for server to run on with backup port
const port = process.env.PORT || 3000;

// creat dummy data to test routes
const groupName = "Don't Phase Me Bros.";
const projectName = 'Game Time';
const dummyData = {
  group: `${groupName}`,
  project: `${projectName}`,
};

// Create Test Routes
app.get('/api', (req, res) => {
  res.send(dummyData);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

// set server to listen for events on PORT
app.listen(port, () => {
  console.log(`This server only listens to:${port}`);
});
