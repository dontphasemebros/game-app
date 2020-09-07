// import { useState } from 'react';
import axios from 'axios';

// gets authenticated user's information for current session
export const getAuth = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/api/session',
  })
    .then((response) => {
      console.log('GET AUTH RESPONSE: ', response.data);
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

export const getNews = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/api/articles',
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

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

export const getThreadsByChannel = (channelObj) => new Promise((resolve, reject) => {
  // NOTE: SAMPLE DATA CHANNEL 1 IS EMPTY
  const { idChannel } = channelObj;
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
