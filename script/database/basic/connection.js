const mysql = require('mysql2/promise');
require('dotenv').config();

async function createPool() {
  try {
    // 根據環境變數選擇本地或 AWS 的資料庫
    const poolConfig = {
      host: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_HOST : 'fangfoodbackend-v3-instance-1.cd08s4082uws.ap-northeast-1.rds.amazonaws.com',
      user: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_USER : 'admin',
      password: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_PASSWORD : '',
      database: process.env.USE_LOCAL_DB === 'true' ? process.env.MYSQL_DATABASE : process.env.AWS_MYSQL_DATABASE,
      charset: 'utf8mb4', // 設定字元集以支援特殊字符
      port: 3306,
      waitForConnections: true, // 達到連接上限時等待
      connectionLimit: 10, // 最大連接數
      queueLimit: 0, // 設定佇列限制
    };

    // 建立 MySQL 連接池
    const pool = mysql.createPool(poolConfig);
    console.log(`已成功連接到 ${process.env.USE_LOCAL_DB === 'true' ? '本地' : 'AWS'} MySQL 資料庫`);
    return pool;
  } catch (err) {
    console.error('資料庫連接錯誤:', err.message);
    throw err; // 傳遞錯誤以便上層捕捉
  }
}

module.exports = createPool();
