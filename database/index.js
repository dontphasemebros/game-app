const { Pool } = require('pg');
// Client?

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

// takes an object with user properties: idDiscord, username, profilePhotoUrl, location, age
// returns array containing newly created user object
async function addUser(userObj) {
  const {
    idDiscord, username, profilePhotoUrl, location, age,
  } = userObj;

  const addUserCommand = `
    INSERT INTO users (id_discord, username, profile_photo_url, location, age)
    VALUES ($1, $2, $3, $4, $5);
  `;

  const getAddededUserCommand = `
    SELECT *
    FROM users
    WHERE id_discord = $1
  `;

  try {
    await pool.query(addUserCommand, [idDiscord, username, profilePhotoUrl, location, age]);
    let addedUser = await pool.query(getAddededUserCommand, [idDiscord]);
    addedUser = addedUser.rows;
    addedUser[0].scores = [];
    return addedUser;
  } catch (error) {
    return console.error('COULD NOT ADD USER TO DATABASE', error);
  }
}

// *****DOES NOT WORK YET***** takes a number representing the channel ID
// returns array of threads with user info and a nested array of thread replies
async function getThreads(id) {
  // console.log('ID IN GET THREADS: ', id);
  const getThreadsCommand = `
    SELECT users.* as user, threads.*
    FROM threads
    LEFT JOIN users
    ON threads.id_user = users.id
    WHERE id_channel = $1
    ORDER BY created_at DESC
  `;

  // const getRepliesCommand = `
  //   SELECT *
  //   FROM replies
  //   WHERE id_thread = $2
  //   ORDER BY created_at DESC
  // `;

  try {
    let threads = await pool.query(getThreadsCommand, [id]);
    threads = threads.rows;
    // threads.forEach(async (thread) => {
    //   console.log(thread.id);
    //   const threadId = thread.id;
    //   console.log('threadId: ', threadId);
    //   const replies = await pool.query(getRepliesCommand, [threadId]);
    //   thread.replies = replies.rows;
    // });
    return threads;
  } catch (error) {
    return console.error('COULD NOT GET THREADS FROM DATABASE', error);
  }
}

module.exports = {
  getUser,
  addUser,
  getThreads,
};
