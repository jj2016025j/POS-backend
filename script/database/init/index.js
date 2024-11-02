// database/init/InitDB.js
const createOrUseDatabase = require('./createOrUseDatabase');
const createTables = require('./createTables');
const insertInitialData = require('./insertInitialData');
const { closeConnection } = require('../connection');

const DATABASE_NAME = process.env.MYSQL_DATABASE;

async function initializeDatabase() {
  try {
    console.log("正在檢查或創建資料庫...");
    await createOrUseDatabase(DATABASE_NAME);

    console.log("正在建立資料表...");
    await createTables();

    console.log("正在插入初始數據...");
    await insertInitialData();

    console.log("資料庫初始化成功！");
  } catch (error) {
    console.error("資料庫初始化失敗:", error);
  } finally {
    await closeConnection();  // 確保在操作完成後釋放連線
  }
}

module.exports = initializeDatabase;
