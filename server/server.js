// import dotenv module in this file
require('dotenv').config();

// import express module into file
const express = require('express');

// import socket.io for live chat
const socket = require('socket.io');

// import path module to serve static assets
const path = require('path');

// import express body-parser module
const bodyParser = require('body-parser');

// import cookie parser from express framework
const cookieParser = require('cookie-parser');

// import express-session module
const session = require('express-session');

// import passport module
const passport = require('passport');

// import DiscordStrategy authentication strategy
// const discordStrategy = require('../src/strategies/discordStrategy');

// create variable set to new express instance
const app = express();

// utilize cookie-parser middleware from express framework
app.use(cookieParser());

// utilize body parser on incoming requests to server
app.use(bodyParser.json());

// utilize the urlencoded from express framework
app.use(bodyParser.urlencoded({ extended: false }));

// require DB and API routers in server file to properly route request through server
const database = require('../routes/dbRoutes');
const api = require('../routes/apiRoutes');

// set port for server to run on with backup port
const port = process.env.SERVER_PORT || 3000;

// dummy data to test routes
const groupName = "Don't Phase Me Bros.";
const projectName = 'Game Time';
const dummyData = {
  group: `${groupName}`,
  project: `${projectName}`,
};

//  initialize the express session
app.use(session({
  secret: 'some random secret',
  cookie: {
    maxAge: 60000 * 60 * 24, // one day max age
  },
  resave: true,
  saveUninitialized: false,
  name: 'discord.oauth2',
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// use router to direct to dbRoutes file
app.use('/', database);

// use router to direct to apiRoutes file
app.use('/api', api);

// create variables to rep static file paths to be served
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// middleware to server static files
app.use(express.static(DIST_DIR));

// Create Test Routes
app.get('/api', (req, res) => {
  res.send(dummyData);
});

// route serving static files
app.get('/*', (req, res) => {
  res.sendFile(HTML_FILE);
});

// set server to listen for events on PORT
const server = app.listen(port, () => {
  console.log(`This server only listens to:${port}`);
});

// Socket setup
const io = socket(server);

// establish socket on
io.on('connection', (socket1) => {
  socket1.emit('your id', socket1.id);
  socket1.on('send message', (body) => {
    io.emit('message', body);
  });
});

// module.exports = discordStrategy;
