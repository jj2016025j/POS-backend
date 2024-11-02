// database/init/createTables.js
const { createTable } = require('../basic/dbTableManagement');
const tableDefinitions = require('../data/tableDefinitions');
const sqlErrorHandler = require('../../utils/sqlErrorHandler');

async function createTables() {
  try {
    for (const [tableName, tableDefinition] of Object.entries(tableDefinitions)) {
      await createTable(tableName, tableDefinition);
      console.log(`表格 ${tableName} 建立完成`);
    }
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error(`建立資料表失敗:`, simpleError.message);
    throw simpleError; // 將錯誤重新拋出給上層處理
  }
}

module.exports = createTables;
