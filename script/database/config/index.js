// database/config.js
require('dotenv').config();

const poolConfig = {
  host: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_HOST : 'fangfoodbackend-v3-instance-1.cd08s4082uws.ap-northeast-1.rds.amazonaws.com',
  user: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_USER : 'admin',
  password: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_PASSWORD : '',
  database: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_DATABASE : process.env.AWS_MYSQL_DATABASE,
  charset: 'utf8mb4',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

module.exports = poolConfig;
