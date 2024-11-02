// database/dbTableManagement.js
const { query } = require('./dbBasicOperations');

async function createTable(tableName, tableDefinition) {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`;
  await query(sql);
  console.log(`表格 ${tableName} 已建立`);
}

async function dropTable(tableName) {
  const sql = `DROP TABLE IF EXISTS ${tableName}`;
  await query(sql);
  console.log(`表格 ${tableName} 已刪除`);
}

module.exports = { createTable, dropTable };
