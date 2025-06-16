require('dotenv').config()

const fs = require('fs');
const { Pool } = require('pg');

const localDb = process.env.LOCAL_DB;
const remoteDb = process.env.REMOTE_DB;

module.exports = new Pool ({
  connectionString: remoteDb,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
});