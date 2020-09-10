// import dotenv module in this file
require('dotenv').config();

// import express module into file
const express = require('express');

// import socket.io for live chat
const socketio = require('socket.io');

// import path module to serve static assets
const path = require('path');

// import express body-parser module
const bodyParser = require('body-parser');

// import cookie parser from express framework
// const cookieParser = require('cookie-parser');

// import express-session module
const session = require('express-session');

// import cookie-session module
// const cookieSession = require('cookie-session');

// import passport module
const passport = require('passport');

// import DiscordStrategy authentication strategy
require('../src/strategies/discordStrategy');

// import googleStrategy authentication strategy
require('../src/strategies/googleStrategy');

// create variable set to new express instance
const app = express();

// utilize cookie-parser middleware from express framework
// app.use(cookieParser());

// utilize body parser on incoming requests to server
app.use(bodyParser.json());

// utilize the urlencoded from express framework
app.use(bodyParser.urlencoded({ extended: false }));

// require DB and API routers in server file to properly route request through server
const database = require('../routes/dbRoutes');
const api = require('../routes/apiRoutes');

// set port for server to run on with backup port
const port = process.env.SERVER_PORT || 3000;

//  initialize the express session - discord related
app.use(session({
  secret: 'some random secret',
  cookie: {
    maxAge: 60000 * 60 * 24, // one day max age
  },
  resave: true,
  saveUninitialized: false,
  name: 'discord.oauth2',
}));

// Configure Cookie-Session Storage - google related
// app.use(cookieSession({
//   name: 'session-name',
//   keys: ['key1', 'key2'],
// }));
app.use(session({
  secret: 'some random secret',
  cookie: {
    maxAge: 60000 * 60 * 24, // one day max age
  },
  resave: true,
  saveUninitialized: false,
  name: 'google.oauth2',
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

// route serving static files
app.get('/*', (req, res) => {
  res.sendFile(HTML_FILE);
});

// set server to listen for events on PORT
const server = app.listen(port, () => {
  console.log(`This server only listens to:${port}`);
});

// Socket setup
const io = socketio(server);
const {
  addUser, removeUser, getUser, getUsersInRoom,
} = require('./user');

// Server side game assets
const players = {};

const star = {
  x: Math.floor(Math.random() * 700) + 50,
  y: Math.floor(Math.random() * 500) + 50,
};

const scores = {
  blue: 0,
  red: 0,
};

// establish socket on
io.on('connection', (socket) => {
  console.log('a user connected');
  // create a new player and add it to our players object
  players[socket.id] = {
    rotation: 0,
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    team: (Math.floor(Math.random() * 2) === 0) ? 'red' : 'blue',
  };
  // send the players object to the new player
  socket.emit('currentPlayers', players);
  // send the star object to the new player
  socket.emit('starLocation', star);
  // send the current scores
  socket.emit('scoreUpdate', scores);

  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  socket.on('playerMovement', (movementData) => {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    players[socket.id].rotation = movementData.rotation;
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  socket.on('starCollected', () => {
    if (players[socket.id].team === 'red') {
      scores.red += 10;
    } else {
      scores.blue += 10;
    }
    star.x = Math.floor(Math.random() * 700) + 50;

    star.y = Math.floor(Math.random() * 500) + 50;

    io.emit('starLocation', star);
    io.emit('scoreUpdate', scores);
  });

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit('message', { user: 'GameTime Bot', text: `${user.name}, welcome to the chat: ${user.room}` });

    socket.broadcast.to(user.room).emit('message', { user: 'GameTime Bot', text: `${user.name}, has joined!` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();

    return null;
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'GameTime Bot', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
    console.log('user disconnected');
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });
});
