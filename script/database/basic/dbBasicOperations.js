// database/baseOperations.js
const { getPool } = require('../connection');

async function query(sql, params = []) {
  const pool = getPool();
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
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
