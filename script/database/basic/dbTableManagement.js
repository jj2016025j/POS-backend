// database/dbTableManagement.js
const { query } = require('./dbBasicOperations');
const sqlErrorHandler = require('../../utils/sqlErrorHandler');

async function createTable(tableName, tableDefinition) {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`;
    await query(sql);
    console.log(`表格 ${tableName} 已建立`);
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error(`建立表格 ${tableName} 失敗:`, simpleError.message);
    throw simpleError; // 將錯誤重新拋出
  }
}

async function dropTable(tableName) {
  try {
    const sql = `DROP TABLE IF EXISTS ${tableName}`;
    await query(sql);
    console.log(`表格 ${tableName} 已刪除`);
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error(`刪除表格 ${tableName} 失敗:`, simpleError.message);
    throw simpleError; // 將錯誤重新拋出
  }
}

module.exports = { createTable, dropTable };
