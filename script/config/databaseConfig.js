// database/config.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// log 環境變數來確認設定正確
console.log('資料庫設定:');
console.log('MYSQL_HOST:', process.env.MYSQL_HOST);
console.log('MYSQL_USER:', process.env.MYSQL_USER);
console.log('MYSQL_PASSWORD:', process.env.MYSQL_PASSWORD ? '已設定' : '未設定');
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE);

const databaseName = process.env.MYSQL_DATABASE;
const config = {
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
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

const sequelize = new Sequelize(databaseName, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging,
  pool: config.pool
});

module.exports = { sequelize, getSequelizeInstance };
