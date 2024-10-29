// db/connection.js
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createPool() {
  try {
    // 建立 MySQL 連接池
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST, // 資料庫主機位址
      user: process.env.MYSQL_USER, // 資料庫使用者名稱
      password: process.env.MYSQL_PASSWORD, // 資料庫使用者密碼
      database: process.env.MYSQL_DATABASE || process.env.TEST_MYSQL_DATABASE, // 資料庫名稱
      charset: "utf8mb4", // 設定字元集以支援特殊字符
      port: 3306, // MySQL 預設連接埠號碼
      waitForConnections: true, // 達到連接上限時等待
      connectionLimit: 10, // 最大連接數
      queueLimit: 0 // 設定佇列限制
    });

    console.log('已成功連接到 MySQL 資料庫'); // 連接成功訊息
    return pool;
  } catch (err) {
    console.error('資料庫連接錯誤:', err.message); // 錯誤訊息
    throw err; // 傳遞錯誤以便上層捕捉
  }
}

module.exports = createPool();