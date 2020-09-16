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
export const getTopScores = () => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: '/scores',
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

// adds a thread to the database from an object containing idChannel, idUser, text
export const submitThread = (threadObj) => new Promise((resolve, reject) => {
  const {
    text,
    photoUrl,
    idUser,
    idChannel,
  } = threadObj;
  axios({
    method: 'post',
    url: '/threads',
    params: {
      text,
      photoUrl,
      idUser,
      idChannel,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// adds a reply to the database from an object containing idChannel, idUser, text
export const submitReply = (replyObj) => new Promise((resolve, reject) => {
  const {
    text,
    photoUrl,
    idUser,
    idThread,
  } = replyObj;
  axios({
    method: 'post',
    url: '/replies',
    params: {
      text,
      photoUrl,
      idUser,
      idThread,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// gets all scores for one user from db by user id
export const getScoresByUser = (idUser) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `/scores/${idUser}`,
    params: {
      idUser,
    },
  })
    .then((response) => {
      resolve(response.data);
    }).catch((err) => reject(err));
});

// saves an uploaded photo to the database
export const uploadPhoto = (data) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: '/uploads',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((response) => {
      resolve(response.data.photoUrl);
    })
    .catch((err) => {
      reject(err);
    });
});

// gets all posts made by current user
export const getPostsByUser = (idUser) => new Promise((resolve, reject) => {
  console.log('*****idUser helpers file**********', idUser);
  axios({
    method: 'get',
    url: '/posts',
    params: {
      idUser,
    },
  })
    .then((response) => {
      console.log('**** getPosts helpers file then block*********', response);
      resolve(response.data);
    }).catch((err) => reject(err));
});
