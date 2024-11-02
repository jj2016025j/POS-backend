// database/init/createOrUseDatabase.js
const { createDatabase, useDatabase } = require('../dbDatabaseManagement');

async function createOrUseDatabase(databaseName) {
  try {
    await useDatabase(databaseName);
    console.log(`已使用資料庫: ${databaseName}`);
  } catch (error) {
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log(`資料庫 ${databaseName} 不存在，正在創建...`);
      await createDatabase(databaseName);
      await useDatabase(databaseName);
      console.log(`資料庫 ${databaseName} 創建並已使用`);
    } else {
      throw error;
    }
  }
}

module.exports = createOrUseDatabase;