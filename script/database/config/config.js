// database/config.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const databaseName = process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_DATABASE : process.env.AWS_MYSQL_DATABASE;
const config = {
  host: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_HOST : 'fangfoodbackend-v3-instance-1.cd08s4082uws.ap-northeast-1.rds.amazonaws.com',
  username: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_USER : 'admin',
  password: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_PASSWORD : '',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,           // 最大連接數
    min: 0,           // 最小連接數
    acquire: 30000,   // 取得連接的最長時間
    idle: 10000       // 釋放前等待的最長時間
  }
};

// 返回連接指定資料庫的 Sequelize 實例
function getSequelizeInstance(withDb = true) {
  return new Sequelize(withDb ? databaseName : '', config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool
  });
}

module.exports = { getSequelizeInstance };
