require('dotenv').config();
const { expect } = require('chai');
const sinon = require('sinon');
const request = require('request');
const testData = require('./testData.json');

let resObject;
let fakeBodyNews;
let fakeBodyUsers;
beforeEach(() => {
  resObject = {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
  };
  fakeBodyNews = {
    status: 'success',
    data: testData.newsData,
  };
  fakeBodyUsers = {
    status: 'success',
    data: testData.userData,
  };
  this.get = sinon.stub(request, 'get');
});

afterEach(() => {
  request.get.restore();
});

describe('Gamespot API', () => {
  it('should return 10 articles', (done) => {
    this.get.yields(null, resObject, JSON.stringify(fakeBodyNews));
    request.get('/articles', (err, res, body) => {
      const jsonbody = JSON.parse(body);
      expect(jsonbody).to.be.a('object');
      expect(jsonbody.data).to.have.lengthOf(10);
      done();
    });
  });
});

describe('Google API', () => {
  it('should return user info', (done) => {
    this.get.yields(null, resObject, JSON.stringify(fakeBodyUsers));
    request.get('/google', (err, res, body) => {
      const jsonbody = JSON.parse(body);
      expect(jsonbody.data[0].idDiscord).to.be.a('string');
      expect(jsonbody.data[0].idDiscord).to.equal('12345');
      expect(jsonbody.data[0].username).to.equal('Ben');
      expect(jsonbody.data[0].location).to.equal('Mandeville');
      expect(jsonbody).to.be.a('object');
      done();
    });
  });
});

describe('Discord API', () => {
  it('should return user info', (done) => {
    this.get.yields(null, resObject, JSON.stringify(fakeBodyUsers));
    request.get('/discord', (err, res, body) => {
      const jsonbody = JSON.parse(body);
      expect(jsonbody).to.be.a('object');
      expect(jsonbody.data[0].idDiscord).to.be.a('string');
      expect(jsonbody.data[0].idDiscord).to.equal('12345');
      expect(jsonbody.data[0].username).to.equal('Ben');
      expect(jsonbody.data[0].location).to.equal('Mandeville');
      done();
    });
  });
});

describe('Unauthorized routes', () => {
  it('should make a GET/POST request to /threads', (done) => {
    this.get.yields(null, resObject, JSON.stringify(fakeBodyUsers));
    request.get('/threads', (err, res, body) => {
      const jsonbody = JSON.parse(body);
      expect(jsonbody).to.be.a('object');
      done();
    });
  });
  it('should make a GET/POST request to /users', (done) => {
    this.get.yields(null, resObject, JSON.stringify(fakeBodyUsers));
    request.get('/users', (err, res, body) => {
      const jsonbody = JSON.parse(body);
      expect(jsonbody).to.be.a('object');
      done();
    });
  });
  it('should make a request to /sessions', (done) => {
    this.get.yields(null, resObject, JSON.stringify(fakeBodyUsers));
    request.get('/session', (err, res, body) => {
      const jsonbody = JSON.parse(body);
      expect(jsonbody).to.be.a('object');
      expect(jsonbody.data).to.have.lengthOf(1);
      done();
    });
  });
});
