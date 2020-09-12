require('dotenv').config();
const { expect } = require('chai');
const axios = require('axios');
const request = require('request');

describe('DBroutes - Server-side', () => {
  it('should make a GET/POST request to /replies', () => {
    axios.get('/replies', { proxy: { host: 'localhost', port: 8080 } }, { idThread: 1 })
      .then((result) => {
        expect(result.status).to.equal(200);
        expect(result.data).to.be.a('string');
      }).catch((err) => console.error(err));
  });
  it('should make a GET/POST request to /articles', () => {
    axios.get('/articles', { proxy: { host: 'localhost', port: 8080 } })
      .then((result) => {
        expect(result.status).to.equal(200);
      }).catch((err) => console.error(err));
  });
  it('should make a GET/POST request to /scores', (done) => {
    axios.get('/scores', { proxy: { host: 'localhost', port: 8080 }, params: { idGame: 1 } })
      .then((result) => {
        expect(result.data).to.be.a('array');
        done();
      }).catch((err) => console.error(err));
  });
});

describe('Authentication', () => {
  it('should require users to log in before playing game', () => {
    axios.get('/game', { proxy: { host: 'localhost', port: 8080 } })
      .then((result) => {
        expect(result.status).to.equal(200);
      }).catch((err) => console.error(err));
  });
  it('should contain a login route for users to log in through', () => {
    axios.get('/login', { proxy: { host: 'localhost', port: 8080 } })
      .then((result) => {
        expect(result.status).to.equal(200);
        expect(result.data).to.be.a('string');
      }).catch((err) => console.error(err));
  });
  it('should have a logout route for users to sign out of their account', () => {
    axios.get('/logout', { proxy: { host: 'localhost', port: 8080 } })
      .then((result) => {
        expect(result.status).to.equal(200);
        expect(result.data).to.be.a('string');
      }).catch((err) => console.error(err));
  });
  it('should deny users from uploading scores without signing in', (done) => {
    request.post({ url: 'http://localhost:8080/scores', form: {} }, (err, res, body) => {
      if (err) {
        console.error(err);
      }
      expect(body).to.equal('Unauthorized');
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('should deny permission to upload threads if a user is not signed in', (done) => {
    request.post({ url: 'http://localhost:8080/threads', form: {} }, (err, res, body) => {
      if (err) {
        console.error(err);
      }
      expect(body).to.equal('Unauthorized');
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('should deny users access to uploading replies without signing in', (done) => {
    request.post({ url: 'http://localhost:8080/replies', form: {} }, (err, res, body) => {
      if (err) {
        console.error(err);
      }
      expect(body).to.equal('Unauthorized');
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
});
