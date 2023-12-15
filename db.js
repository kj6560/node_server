const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'host',
  user: 'user',
  password: 'password',
  database: 'db',
});


db.connect((err) => {
  if (err) {
    throw err;
  }
});

module.exports = db;
