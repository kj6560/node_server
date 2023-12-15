const mysql = require('mysql');

const db = mysql.createConnection({
  host: '114.69.243.148',
  user: 'shiwkes1_project_keshav',
  password: 'ProAv!@12',
  database: 'shiwkes1_project_avish',
});


db.connect((err) => {
  if (err) {
    throw err;
  }
});

module.exports = db;