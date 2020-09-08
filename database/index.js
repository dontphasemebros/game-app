const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`,
});

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

  const getUserScoresCommand = `
    SELECT
      s.id AS "idScore",
      s.value,
      s.id_user AS "idUser",
      s.id_game AS "idGame",
      s.created_at AS "createdAt"
    FROM scores AS s
    WHERE id_user = $1
    ORDER BY s.id_game, s.value DESC
  `;

  try {
    let user = await pool.query(getUserCommand, [idDiscord]);
    [user] = user.rows;
    if (user) {
      const { idUser } = user;
      user = await pool.query(updateUserCommand, [username, profilePhotoUrl, location, idUser]);
      [user] = user.rows;
      const scores = await pool.query(getUserScoresCommand, [idUser]);
      if (scores) user.scores = scores.rows;
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
    addedUser = addedUser.rows;
    addedUser[0].scores = [];
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
    const results = [];
    await Promise.all(threads.map(async (thread) => {
      const { idThread } = thread;
      const getRepliesCommand = `
        SELECT
          r.id AS "idReply",
          r.text,
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
        ORDER BY r.created_at, r.id
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
// returns array containing newly created thread object with user info
async function addThread(threadObj) {
  const {
    text, idUser, idChannel,
  } = threadObj;

  const addThreadCommand = `
    INSERT INTO threads AS t (text, id_user, id_channel)
    VALUES ($1, $2, $3)
    RETURNING
      t.id AS "idThread"
  `;

  try {
    const thread = await pool.query(addThreadCommand, [text, idUser, idChannel]);
    const { idThread } = thread.rows[0];
    const getAddedThreadCommand = `
      SELECT
        t.id AS "idThread",
        t.text,
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

// takes an object with reply properties: text, idUser, idThread
// returns array containing newly created reply object with user info
async function getReplies() {
  const getRepliesCommand = `
    <COMMAND>
  `;
  try {
    // <CODE>
    console.log(getRepliesCommand); // preventing Husky
    return ''; // preventing Husky
  } catch (error) {
    return console.error('COULD NOT GET REPLY FROM DATABASE', error);
  }
}

// takes an object with reply properties: text, idUser, idThread
// returns array containing newly created reply object with user info
async function addReply(replyObj) {
  const {
    text, idUser, idThread,
  } = replyObj;

  const addReplyCommand = `
    INSERT INTO replies AS r (text, id_user, id_thread)
    VALUES ($1, $2, $3)
    RETURNING
      r.id AS "idReply"
  `;
  try {
    const reply = await pool.query(addReplyCommand, [text, idUser, idThread]);
    const { idReply } = reply.rows[0];
    const getRepliesCommand = `
      SELECT
        r.id AS "idReply",
        r.text,
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
      ORDER BY r.created_at, r.id
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
async function getScores(idGame) {
  const getScoresCommand = `
    SELECT
      s.id,
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
    WHERE id_game = $1
    ORDER BY s.value DESC
    LIMIT 10
  `;

  try {
    let scores = await pool.query(getScoresCommand, [idGame]);
    scores = scores.rows;
    return scores;
  } catch (error) {
    return console.error('COULD NOT GET SCORES FROM DATABASE', error);
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
      s.id AS "idScore"
  `;

  try {
    const score = await pool.query(addScoreCommand, [value, idUser, idGame]);
    const { idScore } = score.rows[0];
    const getAddedScoreCommand = `
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
      WHERE s.id = ${idScore}
      ORDER BY s.value DESC
      LIMIT 10
    `;
    let addedScore = await pool.query(getAddedScoreCommand);
    addedScore = addedScore.rows;
    return addedScore;
  } catch (error) {
    return console.error('COULD NOT ADD SCORE TO DATABASE', error);
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
};
