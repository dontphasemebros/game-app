const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`,
});

// takes an object containing user properties: idDiscord, username, profilePhotoUrl, and location
// adds user to database if doesn't exist/updates if does exist; returns all user info in an object
async function getUser(userObj) {
  const {
    idDiscord, username, profilePhotoUrl, location,
  } = userObj;

  const getUserCommand = `
    SELECT
      u.id AS "idUser",
      u.id_discord AS "idDiscord",
      u.username,
      u.profile_photo_url AS "profilePhotoUrl",
      u.location
    FROM users AS u
    WHERE id_discord = $1
  `;

  const updateUserCommand = `
    UPDATE users
    SET
      username = $1,
      profile_photo_url = $2,
      location = $3
    WHERE id = $4
    RETURNING
      id AS "idUser",
      id_discord AS "idDiscord",
      username,
      profile_photo_url AS "profilePhotoUrl",
      location
  `;

  try {
    let user = await pool.query(getUserCommand, [idDiscord]);
    [user] = user.rows;
    if (user) {
      const { idUser } = user;
      user = await pool.query(updateUserCommand, [username, profilePhotoUrl, location, idUser]);
      [user] = user.rows;
    }
    return user;
  } catch (error) {
    return console.error('COULD NOT GET USER FROM DATABASE', error);
  }
}

// takes an object with user properties: idDiscord (string), username, profilePhotoUrl, location
// returns array containing newly created user object
async function addUser(userObj) {
  const {
    idDiscord, username, profilePhotoUrl, location,
  } = userObj;

  const addUserCommand = `
    INSERT INTO users AS u (id_discord, username, profile_photo_url, location)
    VALUES ($1, $2, $3, $4)
    RETURNING
      u.id AS "idUser",
      u.id_discord AS "idDiscord",
      u.username,
      u.profile_photo_url AS "profilePhotoUrl",
      u.location
  `;

  try {
    let addedUser = await pool.query(addUserCommand,
      [idDiscord, username, profilePhotoUrl, location]);
    [addedUser] = addedUser.rows;
    addedUser.scores = [];
    return addedUser;
  } catch (error) {
    return console.error('COULD NOT ADD USER TO DATABASE', error);
  }
}

// takes a number representing the channel ID
// returns array of threads with user info and a nested array of thread replies with user info
async function getThreads(idChannel) {
  const getThreadsCommand = `
    SELECT
      t.id AS "idThread",
      t.text,
      t.photo_url AS "photoUrl",
      t.id_channel AS "idChannel",
      t.updated_at AS "updatedAt",
      t.created_at AS "createdAt",
      t.id_user AS "idUser",
      u.id_discord AS "idDiscord",
      u.username,
      u.profile_photo_url AS "profilePhotoUrl",
      u.location
    FROM threads t
    LEFT JOIN users u
    ON t.id_user = u.id
    WHERE id_channel = $1
    ORDER BY t.created_at DESC, t.id
  `;

  try {
    let threads = await pool.query(getThreadsCommand, [idChannel]);
    threads = threads.rows;
    threads = await Promise.all(threads.map(async (thread) => {
      const { idThread } = thread;
      const getRepliesCommand = `
        SELECT
          r.id AS "idReply",
          r.text,
          r.photo_url AS "photoUrl",
          r.id_thread AS "idThread",
          r.created_at AS "createdAt",
          r.id_user AS "idUser",
          u.id_discord AS "idDiscord",
          u.username,
          u.profile_photo_url AS "profilePhotoUrl",
          u.location
        FROM replies r
        LEFT JOIN users u
        ON r.id_user = u.id
        WHERE id_thread = ${idThread}
        ORDER BY r.created_at DESC, r.id
      `;
      const replies = await pool.query(getRepliesCommand);
      const finishedThread = thread;
      finishedThread.replies = replies.rows ? replies.rows : [];
      return finishedThread;
    }));
    return threads;
  } catch (error) {
    return console.error('COULD NOT GET THREADS FROM DATABASE', error);
  }
}

// takes an object with thread properties: text, idUser, idChannel
// returns array containing newly created thread object with user info
async function addThread(threadObj) {
  const {
    text, photoUrl, idUser, idChannel,
  } = threadObj;

  const addThreadCommand = `
    INSERT INTO threads AS t (text, photo_url, id_user, id_channel)
    VALUES ($1, $2, $3, $4)
    RETURNING
      t.id AS "idThread"
  `;

  try {
    const thread = await pool.query(addThreadCommand, [text, photoUrl, idUser, idChannel]);
    const { idThread } = thread.rows[0];
    const getAddedThreadCommand = `
      SELECT
        t.id AS "idThread",
        t.text,
        t.photo_url AS "photoUrl",
        t.id_channel AS "idChannel",
        t.updated_at AS "updatedAt",
        t.created_at AS "createdAt",
        t.id_user AS "idUser",
        u.id_discord AS "idDiscord",
        u.username,
        u.profile_photo_url AS "profilePhotoUrl",
        u.location
      FROM threads t
      LEFT JOIN users u
      ON t.id_user = u.id
      WHERE t.id = ${idThread}
      ORDER BY t.created_at DESC, t.id
    `;
    let addedThread = await pool.query(getAddedThreadCommand);
    addedThread = addedThread.rows;
    addedThread[0].replies = [];
    return addedThread;
  } catch (error) {
    return console.error('COULD NOT ADD THREAD TO DATABASE', error);
  }
}

// takes a number representing thread id
// returns thread object with user info with a nested array of replies with user info
async function getReplies(idThread) {
  const getThreadsCommand = `
    SELECT
      t.id AS "idThread",
      t.text,
      t.photo_url AS "photoUrl",
      t.id_channel AS "idChannel",
      t.updated_at AS "updatedAt",
      t.created_at AS "createdAt",
      t.id_user AS "idUser",
      u.id_discord AS "idDiscord",
      u.username,
      u.profile_photo_url AS "profilePhotoUrl",
      u.location
    FROM threads t
    LEFT JOIN users u
    ON t.id_user = u.id
    WHERE t.id = $1
    ORDER BY t.created_at DESC, t.id
  `;

  const getRepliesCommand = `
    SELECT
      r.id AS "idReply",
      r.text,
      r.photo_url AS "photoUrl",
      r.id_thread AS "idThread",
      r.created_at AS "createdAt",
      r.id_user AS "idUser",
      u.id_discord AS "idDiscord",
      u.username,
      u.profile_photo_url AS "profilePhotoUrl",
      u.location
    FROM replies r
    LEFT JOIN users u
    ON r.id_user = u.id
    WHERE id_thread = $1
    ORDER BY r.created_at DESC, r.id
  `;

  try {
    let thread = await pool.query(getThreadsCommand, [idThread]);
    thread = thread.rows;
    const replies = await pool.query(getRepliesCommand, [idThread]);
    thread[0].replies = replies.rows ? replies.rows : [];
    return thread;
  } catch (error) {
    return console.error('COULD NOT GET THREAD FROM DATABASE', error);
  }
}

// takes an object with reply properties: text, idUser, idThread
// returns newly created reply object with user info
async function addReply(replyObj) {
  const {
    text, photoUrl, idUser, idThread,
  } = replyObj;

  const addReplyCommand = `
    INSERT INTO replies AS r (text, photo_url, id_user, id_thread)
    VALUES ($1, $2, $3, $4)
    RETURNING
      r.id AS "idReply"
  `;
  try {
    const reply = await pool.query(addReplyCommand, [text, photoUrl, idUser, idThread]);
    const { idReply } = reply.rows[0];
    const getRepliesCommand = `
      SELECT
        r.id AS "idReply",
        r.text,
        r.photo_url AS "photoUrl",
        r.id_thread AS "idThread",
        r.created_at AS "createdAt",
        r.id_user AS "idUser",
        u.id_discord AS "idDiscord",
        u.username,
        u.profile_photo_url AS "profilePhotoUrl",
        u.location
      FROM replies r
      LEFT JOIN users u
      ON r.id_user = u.id
      WHERE r.id = ${idReply}
      ORDER BY r.created_at DESC, r.id
    `;
    let addedReply = await pool.query(getRepliesCommand);
    addedReply = addedReply.rows;
    return addedReply;
  } catch (error) {
    return console.error('COULD NOT ADD REPLY TO DATABASE', error);
  }
}

// takes a number representing the game ID
// returns array of scores with user info
async function getScores() {
  const getGamesCommand = `
    SELECT
      games.id AS "idGame",
      games.name,
      games.description,
      games.href
    FROM games
    ORDER BY games.id
  `;

  try {
    let games = await pool.query(getGamesCommand);
    games = games.rows;
    games = await Promise.all(games.map(async (game) => {
      const { idGame } = game;
      const getScoresCommand = `
        SELECT
          s.id AS "idScore",
          s.value,
          s.id_game AS "idGame",
          s.created_at AS "createdAt",
          s.id_user AS "idUser",
          u.id_discord AS "idDiscord",
          u.username,
          u.profile_photo_url AS "profilePhotoUrl",
          u.location
        FROM scores s
        LEFT JOIN users u
        ON s.id_user = u.id
        WHERE id_game = ${idGame}
        ORDER BY s.value DESC, s.created_at DESC
        LIMIT 5
      `;
      const scores = await pool.query(getScoresCommand);
      const finishedGame = game;
      finishedGame.scores = scores.rows ? scores.rows : [];
      return finishedGame;
    }));
    return games;
  } catch (error) {
    return console.error('COULD NOT GET TOP SCORES FROM DATABASE', error);
  }
}

// takes an object with score properties: value, idUser, idGame
// returns array containing newly created score object with user info
async function addScore(scoreObj) {
  const {
    value, idUser, idGame,
  } = scoreObj;

  const addScoreCommand = `
    INSERT INTO scores AS s (value, id_user, id_game)
    VALUES ($1, $2, $3)
    RETURNING
      s.id AS "idScore",
      s.value,
      s.id_game AS "idGame",
      s.id_user AS "idUser"
  `;

  try {
    const score = await pool.query(addScoreCommand, [value, idUser, idGame]);
    return score;
  } catch (error) {
    return console.error('COULD NOT ADD SCORE TO DATABASE', error);
  }
}

// takes a number representing the game ID
// returns array of scores with user info
async function getUserScores(idUser) {
  const getGamesCommand = `
    SELECT
      games.id AS "idGame",
      games.name,
      games.description,
      games.href
    FROM games
    ORDER BY games.id
  `;

  try {
    let games = await pool.query(getGamesCommand);
    games = games.rows;
    games = await Promise.all(games.map(async (game) => {
      const { idGame } = game;
      const getScoresCommand = `
        SELECT
          s.id AS "idScore",
          s.value,
          s.id_game AS "idGame",
          s.created_at AS "createdAt",
          s.id_user AS "idUser",
          u.id_discord AS "idDiscord",
          u.username,
          u.profile_photo_url AS "profilePhotoUrl",
          u.location
        FROM scores s
        LEFT JOIN users u
        ON s.id_user = u.id
        WHERE id_game = ${idGame} AND id_user= $1
        ORDER BY s.value DESC, s.created_at DESC
        LIMIT 5
      `;
      const scores = await pool.query(getScoresCommand, [idUser]);
      const finishedGame = game;
      finishedGame.scores = scores.rows ? scores.rows : [];
      return finishedGame;
    }));
    return games;
  } catch (error) {
    return console.error('COULD NOT GET TOP SCORES FROM DATABASE', error);
  }
}

// takes a number representing the channel ID
// returns array of threads with user info and a nested array of thread replies with user info
async function getUserPosts(idUser) {
  const getPostsCommand = `
    SELECT
      t.id AS "idThread",
      t.text,
      t.photo_url AS "photoUrl",
      t.id_channel AS "idChannel",
      t.updated_at AS "updatedAt",
      t.created_at AS "createdAt",
      t.id_user AS "idUser",
      c.name AS "channel"
    FROM threads t
    LEFT JOIN channels c
    ON t.id_channel = c.id
    WHERE id_user = $1
    ORDER BY t.created_at DESC, t.id
  `;

  try {
    let posts = await pool.query(getPostsCommand, [idUser]);
    posts = posts.rows;
    return posts;
  } catch (error) {
    return console.error('COULD NOT GET USER POSTS FROM DATABASE', error);
  }
}

async function deleteThread(idThread) {
  const deleteRepliesCommand = `
    DELETE FROM replies
    WHERE id_thread = $1
  `;

  const deleteThreadCommand = `
    DELETE FROM threads
    WHERE id = $1
  `;

  try {
    const deletedReplies = await pool.query(deleteRepliesCommand, [idThread]);
    const deletedThread = await pool.query(deleteThreadCommand, [idThread]);
    return ({ deletedReplies, deletedThread });
  } catch (error) {
    return console.error('COULD NOT DELETE THREAD FROM DATABASE', error);
  }
}

async function deleteReply(idReply) {
  const deleteReplyCommand = `
    DELETE FROM replies
    WHERE id = $1
  `;

  try {
    const deletedReply = await pool.query(deleteReplyCommand, [idReply]);
    return ({ deletedReply });
  } catch (error) {
    return console.error('COULD NOT DELETE REPLY FROM DATABASE', error);
  }
}

module.exports = {
  getUser,
  addUser,
  getThreads,
  addThread,
  getReplies,
  addReply,
  getScores,
  addScore,
  getUserScores,
  getUserPosts,
  deleteThread,
  deleteReply,
};
