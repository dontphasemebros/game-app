const { Pool } = require('pg');
// Client?

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gametime',
  password: '',
});

const getUser = (id) => pool
  .query('SELECT * FROM users WHERE id = ?', [id])
  .then((res) => res.rows)
  // .then(() => {
  //   pool.query('SELECT * FROM scores WHERE id_user = user.id')
  // })
  .catch((err) => console.error(err));

module.exports = {
  getUser,
};
