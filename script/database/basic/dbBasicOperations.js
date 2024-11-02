// database/baseOperations.js
const { getPool } = require('../connection');
const sqlErrorHandler = require('../../utils/sqlErrorHandler');

async function query(sql, params = []) {
  const pool = getPool();
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    const simpleError = sqlErrorHandler(error);
    console.error('資料庫操作發生錯誤:', simpleError);
  }
}

async function insert(tableName, data) {
  const columns = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map(() => '?').join(', ');
  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
  return await query(sql, Object.values(data));
}

async function update(tableName, data, conditions) {
  const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
  const sql = `UPDATE ${tableName} SET ${updates} WHERE ${whereClause}`;
  return await query(sql, [...Object.values(data), ...Object.values(conditions)]);
}

async function remove(tableName, conditions) {
  const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
  const sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
  return await query(sql, Object.values(conditions));
}

module.exports = { query, insert, update, remove };
