require('dotenv').config();
const { expect } = require('chai');
const { Pool } = require('pg');
const {
  getUser, addUser, addScore, getScores, addReply, getReplies, getThreads, addThread, getUserScores,
} = require('../database/index');

const pool = new Pool({
  user: 'postgres',
  database: 'test',
  password: '',
  host: 'localhost',
});

const userData = {
  idDiscord: '12345',
  username: 'Ben',
  profilePhotoUrl: 'https://avatars1.githubusercontent.com/u/43221771?s=400&u=df8c77de50068df1e09041de441840cff350e47f&v=4',
  location: 'Mandeville',
};

describe('Database', () => {
  it('User information should be passed in/out of Database', (done) => {
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
  it("Should return the user's own high scores.", (done) => {
    const scoreData = {
      value: 51000,
      idUser: 1,
      idGame: 1,
    };
    addScore(scoreData, pool)
      .then(() => {
        getUserScores(scoreData.idUser, pool)
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0]).to.be.a('object');
            expect(result[0].value).to.be.a('number');
            expect(result[0].value).to.equal(51000);
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
