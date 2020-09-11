// import express module into file
const express = require('express');

// create variable set to new Router instance from express module
const dbRouter = express.Router();

// import database helper functions from ../database/index.js
const {
  getUser,
  addUser,
  getThreads,
  addThread,
  addReply,
  getScores,
  addScore,
  getReplies,
  getUserScores,
} = require('../database/index');

// import GCS storage function
const { uploadImage } = require('../GCS_Helpers/gcshelpers.js');

/**
 * Checks to see if a user is logged in to protect api routes
 * @param {Object} user req.user
 */
const authChecker = (user) => !!user;

// Database Routes - all routes prefixed with '/'
// GET routes
/*
* route - retrieves specific user information when given a user id number
* use - uses "getUser" function to retrieve user information from DB
* inputs - "getUser" receives as user id number
* {Param} - id - deconstructed from req.body
* returns - an object of user information from DB
*/
dbRouter.get('/users', (req, res) => {
  const { idDiscord } = req.body;
  if (authChecker(req.user)) {
    getUser(idDiscord)
      .then((foundUser) => {
        res.send(foundUser);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});
/*
* route - retrieves discussion threads information from the db
* use - uses "getThreads" function to discussion threads information from db
* inputs - "getThreads" receives an object of user information:
* {Param} - idChannel deconstructed from req.body
* returns - an array of objects with information for that thread and it's replies
*/
dbRouter.get('/threads', (req, res) => {
  // deconstruct "idChannel" number from req.body to pass to get threads form db
  const { idChannel } = req.query;
  if (authChecker(req.user)) {
    getThreads(idChannel)
      .then((threads) => {
        res.send(threads);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});

// retrieves a single thread and its replies from the db by id ("idThread")
dbRouter.get('/replies', (req, res) => {
  // deconstruct "idChannel" number from req.body to pass to get threads form db
  const { idThread } = req.query;
  // if (authChecker(req.user)) {
  getReplies(idThread)
    .then((thread) => {
      res.send(thread);
    })
    .catch((error) => {
      console.log(error);
    });
  // } else {
  //   // Not Authorized
  //   res.sendStatus(401);
  // }
});
/*
* route - retrieves gamespot API articles saved in database
* use - uses "getArticles" function to retrieve user saved scores from db
* inputs - "getArticles" receives a gamed id number
* {Param} -
* returns -
*/
dbRouter.get('/articles', (req, res) => { // route will be used once articles are being saved in DB
  res.send('GET articles route working');
});
/*
* route - retrieves user scores during game play from the db
* use - uses "getScores" function to retrieve user saved scores from db
* inputs - "getScores" receives a gamed id number
* {Param} - idGame deconstructed from req.body
* returns - an array of objects with information for the users who saved scores for that game
*/
dbRouter.get('/scores', (req, res) => {
  const { idGame } = req.query;
  // if (authChecker(req.user[0])) {
  getScores(idGame)
    .then((score) => {
      res.send(score);
    })
    .catch((error) => {
      console.log(error);
    });
  // } else {
  //   // Not Authorized
  //   res.sendStatus(401);
  // }
});
// POST routes
/*
* route - adds users scores to Database into scores table
* use - uses "addScore" function to save users scores in db
* inputs - "addScore" receives a object
*       scoresObj = { value, idUser, idGame }
* {Param} - deconstructed from req.query
* returns - an array containing an object with all user information, saved score, game info
*/
dbRouter.post('/scores', (req, res) => {
  // console.log('REQ OBJECT: ', req);
  // const { value, idUser, idGame } = req.query;
  // const scoreObj = { value, idUser, idGame };
  const scoreObj = req.query;
  if (authChecker(req.user)) {
    addScore(scoreObj)
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});
// POST routes
/*
* route - adds users scores to Database into scores table
* use - uses "addScore" function to save users scores in db
* inputs - "addScore" receives a object
*       scoresObj = { value, idUser, idGame }
* {Param} - deconstructed from req.query
* returns - an array containing an object with all user information, saved score, game info
*/
dbRouter.get('/scores/:id', (req, res) => {
  // console.log('REQ OBJECT: ', req);
  // const { value, idUser, idGame } = req.query;
  // const scoreObj = { value, idUser, idGame };
  let { idUser } = req.query;
  if (authChecker(req.user)) {
    idUser = req.user.idUser;
    getUserScores(idUser)
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});
/*
* route - adds new user information to the db
* use - uses "addThread" function to add new thread information to DB
* inputs - "addThread" receives an object of thread content information:
*        userObj-- {text, idUser, idChannel}
* {Param} - deconstructed from req.body
* returns - an array containing thread content, user information, & array of corresponding replies
*/
dbRouter.post('/threads', (req, res) => {
  const { text, idUser, idChannel } = req.query;
  const threadObj = { text, idUser, idChannel };
  if (authChecker(req.user)) {
    addThread(threadObj)
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});
/*
* route - this route adds user reply to forum thread to db table replies
* use - uses "addReply" function to add new user information to DB
* inputs - "addReply" receives an object of user information:
*        userObj-- { text, idUser, idThread }
* {Param} - deconstructed from req.body
* returns - an array with object containing reply and user information who made reply
*/
dbRouter.post('/replies', (req, res) => {
  const { text, idUser, idThread } = req.query;
  const replyObj = { text, idUser, idThread };
  if (authChecker(req.user)) {
    addReply(replyObj)
      .then((success) => {
        res.send(success);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});

/*
* route - adds new user information to the db
* use - uses "addUser" function to add new user information to DB
* inputs - "addUser" receives an object of user information:
*        userObj-- {id, username, avatar, locale,}
* {Param} - deconstructed from req.body
* returns -
*/
dbRouter.post('/users', (req, res) => {
  if (authChecker(req.user)) {
    const {
      id, username, avatar, locale,
    } = req.body;
    const userObj = {
      idDiscord: id,
      username,
      profilePhotoUrl: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`,
      location: locale,
    };
    addUser(userObj)
      .then((success) => {
        res.send(success);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});

/*
* route - adds user photos to google cloud storage bucket
* use - route uses uploadImage() function to store user image in GCS bucket
* inputs - loads the image file from request body that users uploads
*      myFile = req.file;
* {Param} - deconstructed form request object
* returns - url to photo in GCS storage bucket
*/
dbRouter.post('/uploads', (req, res) => {
  const myFile = req.file;
  if (authChecker(req.user)) {
    uploadImage(myFile)
      .then((photoUrl) => {
        res.json({
          message: 'Upload was successful',
          data: photoUrl,
        }).send();
      })
      .catch((error) => {
        res.sendStatus(500).json(error);
      });
  } else {
    // Not Authorized
    res.sendStatus(401);
  }
});

module.exports = dbRouter;
