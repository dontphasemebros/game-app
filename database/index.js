const { Pool } = require('pg');
// Client?

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'gametime',
  password: process.env.DB_PASS,
});

// takes a number representing the user's database ID (NOT the Discord ID)
// returns array containing user object with a nested array of the user's scores
async function getUser(id) {
  const getUserCommand = `
    SELECT users.*
    FROM users
    WHERE id = $1
  `;

  const getUserScoreCommand = `
    SELECT scores.*
    FROM scores
    WHERE id_user = $1
  `;

  try {
    let user = await pool.query(getUserCommand, [id]);
    const scores = await pool.query(getUserScoreCommand, [id]);
    user = user.rows;
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

module.exports = {
  getUser,
  addUser,
};
