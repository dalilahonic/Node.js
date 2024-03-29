const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node',
  password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();
