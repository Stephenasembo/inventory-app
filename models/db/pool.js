require('dotenv').config()

const fs = require('fs');
const { Pool } = require('pg');

const prodConfig = {
  connectionString: process.env.REMOTE_DB,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
}

const devConfig = {
  connectionString: process.env.LOCAL_DB,
}

module.exports = new Pool (process.env.NODE_ENV === 'prod' ? prodConfig : devConfig);