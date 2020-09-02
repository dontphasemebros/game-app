const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'gametime',
  password: process.env.DB_PASS,
});

// takes a number representing the user's Discord ID (NOT the database ID)
// returns array containing user object with a nested array of the user's scores
async function getUser(idDiscord) {
  const getUserCommand = `
    SELECT *
    FROM users
    WHERE id_discord = $1
  `;

  const getUserScoreCommand = `
    SELECT *
    FROM scores
    WHERE id_user = $1
  `;

  try {
    let user = await pool.query(getUserCommand, [idDiscord]);
    user = user.rows;
    const idUser = user[0].id;
    const scores = await pool.query(getUserScoreCommand, [idUser]);
    if (scores) user[0].scores = scores.rows;
    return user;
  } catch (error) {
    return console.error('COULD NOT GET USER FROM DATABASE', error);
  }
}

// takes an object with user properties: idDiscord, username, profilePhotoUrl, location
// returns array containing newly created user object nested in an array
async function addUser(userObj) {
  const {
    idDiscord, username, profilePhotoUrl, location,
  } = userObj;

  const addUserCommand = `
    INSERT INTO users (id_discord, username, profile_photo_url, location)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  try {
    let addedUser = await pool.query(addUserCommand,
      [idDiscord, username, profilePhotoUrl, location]);
    addedUser = addedUser.rows;
    addedUser[0].scores = [];
    return addedUser;
  } catch (error) {
    return console.error('COULD NOT ADD USER TO DATABASE', error);
  }
}

// takes a number representing the channel ID
// returns array of threads with user info and a nested array of thread replies
async function getThreads(idChannel) {
  const getThreadsCommand = `
    SELECT users.* as user, threads.*
    FROM threads
    LEFT JOIN users
    ON threads.id_user = users.id
    WHERE id_channel = $1
    ORDER BY created_at, threads.id
  `;

  try {
    let threads = await pool.query(getThreadsCommand, [idChannel]);
    threads = threads.rows;
    const results = [];
    await Promise.all(threads.map(async (thread) => {
      const threadId = thread.id;
      const getRepliesCommand = `
        SELECT *
        FROM replies
        WHERE id_thread = ${threadId}
        ORDER BY created_at, id
      `;
      const replies = await pool.query(getRepliesCommand);
      const finishedThread = thread;
      finishedThread.replies = replies.rows ? replies.rows : [];
      results.push(finishedThread);
    }));
    return await results;
  } catch (error) {
    return console.error('COULD NOT GET THREADS FROM DATABASE', error);
  }
}

// takes an object with thread properties: text, idUser, idChannel
// returns array containing newly created thread object nested in an array
async function addThread(threadObj) {
  const {
    text, idUser, idChannel,
  } = threadObj;

  const addThreadCommand = `
    INSERT INTO threads (text, id_user, id_channel)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    let thread = await pool.query(addThreadCommand, [text, idUser, idChannel]);
    thread = thread.rows;
    thread[0].replies = [];
    return thread;
  } catch (error) {
    return console.error('COULD NOT ADD USER TO DATABASE', error);
  }
}

// takes an object with reply properties: text, idUser, idThread
// returns array containing newly created reply object nested in an array
async function addReply(replyObj) {
  const {
    text, idUser, idThread,
  } = replyObj;

  const addReplyCommand = `
    INSERT INTO replies (text, id_user, id_thread)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    let reply = await pool.query(addReplyCommand, [text, idUser, idThread]);
    reply = reply.rows;
    return reply;
  } catch (error) {
    return console.error('COULD NOT ADD USER TO DATABASE', error);
  }
}

// takes an object with score properties: score, idUser, idGame
// returns array containing newly created score object nested in an array
async function addScore(scoreObj) {
  const {
    text, idUser, idGame,
  } = scoreObj;

  const addScoreCommand = `
    INSERT INTO scores (text, id_user, id_game)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    let score = await pool.query(addScoreCommand, [text, idUser, idGame]);
    score = score.rows;
    return score;
  } catch (error) {
    return console.error('COULD NOT ADD USER TO DATABASE', error);
  }
}

// ************************************************************************
// TO DO WITH JAMES: remove age; reassign userObj = req.body, id => idDiscord, id => idChannel,
// import new helpers, make helper destructuring into column
// ************************************************************************

module.exports = {
  getUser,
  addUser,
  getThreads,
  addThread,
  addReply,
  addScore,
};
