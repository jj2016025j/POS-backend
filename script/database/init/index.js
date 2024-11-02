// database/init/InitDB.js
const createOrUseDatabase = require('./createOrUseDatabase');
const createTables = require('./createTables');
const insertInitialData = require('./insertData');
const { closeConnection } = require('../connection');

const DATABASE_NAME = process.env.MYSQL_DATABASE;

async function initializeDatabase() {
  try {
    console.log("\n正在創建資料庫...");
    await createOrUseDatabase(DATABASE_NAME);
  } catch (error) {
    console.error("資料庫創建或切換失敗:", error);
    // 如果這步驟失敗，後續操作無法進行，直接退出
    return;
  }

  try {
    console.log("\n正在建立資料表...");
    await createTables();
  } catch (error) {
    console.error("建立資料表失敗:", error);
    // 若此步驟失敗，記錄錯誤但繼續執行，以防部分表格成功建立
    return;
  }

  try {
    console.log("\n正在插入初始數據...");
    await insertInitialData();
    console.log("資料庫初始化流程完成！");
  } catch (error) {
    console.error("插入初始數據失敗:", error);
    // 若此步驟失敗，記錄錯誤並繼續，可能表格建立不完整或數據問題
    return;
  }

  // 即使某些步驟失敗，程序流程也不會中斷，finally 確保資源釋放
  finally {
    await closeConnection();
  }
}

module.exports = { initializeDatabase };
