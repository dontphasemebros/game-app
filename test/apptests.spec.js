const { expect } = require('chai');
const axios = require('axios');
// const express = require('express');
// const vhost = require('vhost');
// const io = require('socket.io-client');
require('dotenv').config();
const { Pool } = require('pg');
// const { server } = require('../server/server');
// const app = express();
// const server = express();
// server.use(vhost('localhost', require('../server/server')));

// server.listen(80);

// const socketUrl = server;

const {
  getUser, addUser, addScore, getScores, addReply, getReplies, getThreads, addThread,
} = require('../database/index');

// for making DB pool and test DB
const pool = new Pool({
  user: 'postgres',
  database: 'test',
  password: '',
  host: 'localhost',
});

// const options = {
//   transports: ['websocket'],
//   'force new connection': true,
// };

// const room = 'lobby';
// describe('Web Socket', () => {
//   let client1;
//   let client2;
//   let client3;

//   it('should send and recieve a message', (done) => {
//     client1 = io.connect(socketUrl, options);
//     client1.on('message', (msg) => {
//       expect(msg).to.equal('test');
//       // Disconnect both client connections
//       console.log('does it hit?');
//       client1.disconnect();
//       client2.disconnect();
//       done();
//     });

//     client1.on('connect', () => {
//       client1.emit('join room', room);

//       // Set up client2 connection
//       client2 = io.connect(socketUrl, options);

//       client2.on('connect', () => {
//         // Emit event when all clients are connected.
//         client2.emit('join room', room);
//         client2.emit('message', 'test');
//       });
//     });
//   });
//   it('should send and receive a message only to users in the same room', (done) => {
//     let client2CallCount = 0;
//     let client3CallCount = 0;

//     client1 = io.connect(socketUrl, options);

//     client1.on('connect', () => {
//       client1.emit('join room', room);

//       client2 = io.connect(socketUrl, options);
//       client2.emit('join room', room);

//       client2.on('connect', () => {
//         client3 = io.connect(socketUrl, options);
//         client3.emit('join room', 'test');

//         client3.on('connect', () => {
//           client1.emit('message', 'test');
//         });

//         client3.on('message', () => {
//           client3CallCount += 1;
//         });
//       });

//       client2.on('message', () => {
//         client2CallCount += 1;
//       });
//     });

//     setTimeout(() => {
//       expect(client2CallCount).to.equal(1);
//       expect(client3CallCount).to.equal(0);
//       client1.disconnect();
//       client2.disconnect();
//       client3.disconnect();
//       done();
//     }, 25);
//   });
// });

describe('Database', () => {
  it('User information should be passed in/out of Database', (done) => {
    const userData = {
      idDiscord: '12345',
      username: 'Ben',
      profilePhotoUrl: 'https://avatars1.githubusercontent.com/u/43221771?s=400&u=df8c77de50068df1e09041de441840cff350e47f&v=4',
      location: 'Mandeville',
    };
    addUser(userData, pool)
      .then(() => {
        getUser(userData, pool)
          .then((result) => {
            expect(result).to.be.a('object');
            expect(result.scores).to.be.a('array');
            expect(result.username).to.be.a('string');
            done();
          });
      }).catch((err) => console.error(err));
  });
  it('Highscores should be recorded in Database', (done) => {
    const scoreData = {
      value: 51000,
      idUser: 1,
      idGame: 1,
    };
    addScore(scoreData, pool)
      .then(() => {
        getScores(scoreData.idGame, pool)
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object');
            expect(result[0].value).to.be.a('number');
            expect(result[0].idUser).to.be.a('number');
            done();
          }).catch((err) => console.error(err));
      }).catch((err) => console.error(err));
  });
  it('Reply information should be passed in/out of Database', (done) => {
    const replyData = {
      text: 'Lorem Ipsum Est Sic Mundos',
      idUser: 1,
      idThread: 2,
    };
    addReply(replyData, pool)
      .then(() => {
        getReplies(replyData.idThread, pool)
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object');
            expect(result[0].text).to.be.a('string');
            expect(result[0].idUser).to.be.a('number');
            done();
          }).catch((err) => console.error(err));
      }).catch((err) => console.error(err));
  });
  it('Thread information should be passed in/out of Database', (done) => {
    const threadData = {
      text: 'I am wondering if you could test something for me?',
      idUser: 1,
      idChannel: 3,
    };
    addThread(threadData, pool)
      .then(() => {
        getThreads(threadData.idChannel, pool)
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object');
            expect(result[0].text).to.be.a('string');
            expect(result[0].idChannel).to.be.a('number');
            expect(result[0].idUser).to.be.a('number');
            done();
          }).catch((err) => console.error(err));
      }).catch((err) => console.error(err));
  });
});

describe('DBroutes - Server-side', () => {
  it('should make a GET/POST request to /replies', () => {
    axios.get('/replies', { proxy: { host: 'localhost', port: 8080 } }, { idThread: 1 })
      .then((result) => {
        // will fill in tests when request returns replies
        expect(result.status).to.equal(200);
        expect(result.data).to.be.a('string');
      }).catch((err) => console.error(err));
  });
  it('should make a GET/POST request to /articles', () => {
    axios.get('/articles', { proxy: { host: 'localhost', port: 8080 } })
      .then((result) => {
        // will fill in tests when request returns news
        expect(result.status).to.equal(200);
      }).catch((err) => console.error(err));
  });
  it('should make a GET/POST request to /scores', () => {
    // axios.get('/scores', { proxy: { host: 'localhost', port: 8080 }, params: { idGame: 1 } })
    //   .then((result) => {
    //     // filling out later when further information is provided
    //     console.log(result);
    //     // expect(result.data).to.be.a('array');
    //     done();
    //   }).catch((err) => console.error(err));
  });
  it('should make a GET/POST request to /threads', () => {
    // axios.get('/threads', { proxy: { host: 'localhost', port: 8080 }, params: { idChannel: 1 } })
    //   .then((result) => {
    //     expect(result.status).to.equal(401);
    //     // expect(result.data).to.be.a('array');
    //     done();
    //   }).catch((err) => console.error(err));
  });
  it('should make a GET/POST request to /users', () => {
    // axios.get('/users', { proxy: { host: 'localhost',
    // port: 8080 }, params: { idDiscord: 12345 } })
    //   .then((result) => {
    //     expect(result.status).to.equal(401);
    //     // expect(result.data).to.be.a('array');
    //     // expect(result.data[0].text).to.be.a('string');
    //     done();
    //   }).catch((err) => console.error(err));
  });
});

describe('Authentication', () => {
  it('should require users to log in before playing game', () => {
    axios.get('/game', { proxy: { host: 'localhost', port: 8080 } })
      .then((result) => {
        // confused about the diff between logged and not logged. Lack of info
        expect(result.status).to.equal(200);
      }).catch((err) => console.error(err));
  });
  it('should contain a login route for users to log in through', () => {
    axios.get('/login', { proxy: { host: 'localhost', port: 8080 } })
      .then((result) => {
        // confused about the diff between logged and not logged. Lack of info
        expect(result.status).to.equal(200);
        expect(result.data).to.be.a('string');
      }).catch((err) => console.error(err));
  });
});
