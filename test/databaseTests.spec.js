require('dotenv').config();
const { expect } = require('chai');
const { Pool } = require('pg');
const {
  getUser, addUser, addScore, getScores, addReply, getReplies, getThreads, addThread, getUserScores,
} = require('../database/index');
const testData = require('./testData.json');

const {
  scoreData, userData, threadData, replyData,
} = testData;

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
});

describe('Database', () => {
  it('User information should be passed in/out of Database', (done) => {
    addUser(userData[0], pool)
      .then(() => {
        getUser(userData[0], pool)
          .then((result) => {
            expect(result).to.be.a('object');
            expect(result.idDiscord).to.be.a('string');
            expect(result.profilePhotoUrl).to.be.a('string');
            expect(result.username).to.be.a('string');
            done();
          });
      }).catch((err) => console.error(err));
  });
  it('Highscores should be recorded in Database', (done) => {
    addScore(scoreData[0], pool)
      .then(() => {
        getScores(scoreData[0].idGame, pool)
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0].scores[0]).to.be.a('object');
            expect(result[0].scores[0].value).to.be.a('number');
            expect(result[0].scores[0].idUser).to.be.a('number');
            done();
          }).catch((err) => console.error(err));
      }).catch((err) => console.error(err));
  });
  it("Should return the user's own high scores.", (done) => {
    addScore(scoreData[0], pool)
      .then(() => {
        getUserScores(scoreData[0].idUser, pool)
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0].scores[0]).to.be.a('object');
            expect(result[0].scores[0].value).to.be.a('number');
            expect(result[0].scores[0].value).to.equal(51000);
            expect(result[0].scores[0].idUser).to.be.a('number');
            done();
          }).catch((err) => console.error(err));
      }).catch((err) => console.error(err));
  });
  it('Reply information should be passed in/out of Database', (done) => {
    addReply(replyData[0], pool)
      .then(() => {
        getReplies(replyData[0].idThread, pool)
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
    addThread(threadData[0], pool)
      .then(() => {
        getThreads(threadData[0].idChannel, pool)
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
