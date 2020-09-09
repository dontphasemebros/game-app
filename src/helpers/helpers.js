// import { useState } from 'react';
import axios from 'axios';

// gets authenticated user's information for current session
export const getAuth = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/api/session',
  })
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => {
      reject(err);
    });
});

// gets user from database by third party auth id within a user object
export const getUserData = (userObj) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/users',
    data: {
      userObj,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// gets top ten scores from db by game id
export const getTopScores = (gameObj) => new Promise((resolve, reject) => {
  const { idGame } = gameObj;
  axios({
    method: 'get',
    url: '/scores',
    params: {
      idGame,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// gets gamer news from API
export const getNews = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/api/articles',
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// saves user's game score to the database
export const saveScore = (scoreObj) => new Promise((resolve, reject) => {
  const { idUser, idGame, value } = scoreObj;
  axios({
    method: 'post',
    url: '/scores',
    params: {
      idUser,
      idGame,
      value,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// gets threads by channel id
export const getThreadsByChannel = (idChannel) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/threads',
    params: {
      idChannel,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// gets a single thread and all its replies
export const getThreadReplies = (idThread) => new Promise((resolve, reject) => {
  console.log('idThread in helpers: ', idThread);
  axios({
    method: 'get',
    url: '/replies',
    params: {
      idThread,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});
