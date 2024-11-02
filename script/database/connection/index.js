// database/connection.js
const mysql = require('mysql2/promise');
const poolConfig = require('../config');

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(poolConfig);
    console.log(`已成功連接到 ${process.env.USE_LOCAL_DB === 'true' ? '本地' : 'AWS'} MySQL 資料庫`);
  }
  return pool;
}

async function closeConnection() {
  if (pool) {
    await pool.end();
    console.log("資料庫連接已關閉");
  }
}

module.exports = { getPool, closeConnection };
