// database/dbDatabaseManagement.js
const { query } = require('./dbBasicOperations');
const sqlErrorHandler = require('../../utils/sqlErrorHandler');

async function createDatabase(databaseName) {
  try {
    const sql = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
    await query(sql);
    console.log(`資料庫 ${databaseName} 已建立`);
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error('建立資料庫失敗:', simpleError.message);
    throw simpleError; // 如果需要，可以選擇重新拋出錯誤
  }
}

async function dropDatabase(databaseName) {
  try {
    const sql = `DROP DATABASE IF EXISTS ${databaseName}`;
    await query(sql);
    console.log(`資料庫 ${databaseName} 已刪除`);
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error('刪除資料庫失敗:', simpleError.message);
    throw simpleError;
  }
}

async function useDatabase(databaseName) {
  try {
    await query(`USE ${databaseName}`);
    console.log(`已切換到資料庫 ${databaseName}`);
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error('切換資料庫失敗:', simpleError.message);
    throw simpleError;
  }
}

module.exports = { createDatabase, dropDatabase, useDatabase };