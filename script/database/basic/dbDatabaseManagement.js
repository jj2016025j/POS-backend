// database/dbDatabaseManagement.js
const { query } = require('./dbBasicOperations');

async function createDatabase(databaseName) {
  const sql = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
  await query(sql);
  console.log(`資料庫 ${databaseName} 已建立`);
}

async function dropDatabase(databaseName) {
  const sql = `DROP DATABASE IF EXISTS ${databaseName}`;
  await query(sql);
  console.log(`資料庫 ${databaseName} 已刪除`);
}

module.exports = { createDatabase, dropDatabase };
