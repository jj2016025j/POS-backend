// db/baseOperations.js
const connection = require('./connection');

const pool = {
  /**
   * 通用查詢函數
   * @param {string} sql - SQL 語句
   * @param {any[]} params - SQL 參數
   * @returns {Promise<any[]|{results: any[], fields: any[]}>} - 查詢結果
   */
  async query(sql, params = []) {
    try {
      const [results, fields] = await connection.query(sql, params);
      // 判斷是否為查詢操作
      if (sql.trim().toLowerCase().startsWith("select")) {
        return results; // 對於查詢,返回結果數組
      } else {
        return { results, fields }; // 對於非查詢操作,返回包含結果和字段信息的對象
      }
    } catch (error) {
      console.error('Database query failed:', error);
      throw error;
    }
  },

  /**
   * 構建 SELECT 語句
   * @param {string} tableName - 表名
   * @param {string[]} columns - 需要查詢的列
   * @param {Object} conditions - 查詢條件
   * @returns {Promise<any[]>} - 查詢結果
   */
  async select(tableName, columns = '*', conditions = null) {
    let sql = `SELECT ${columns} FROM ${tableName}`;
    const values = conditions ? Object.values(conditions) : [];
    if (conditions) {
      const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
      sql += ` WHERE ${whereClause}`;
    }
    return await this.query(sql, values);
  },

  /**
   * 構建 INSERT 語句
   * @param {string} tableName - 表名
   * @param {Object} data - 需要插入的數據
   * @returns {Promise<any>} - 操作結果
   */
  async insert(tableName, data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    return await this.query(sql, Object.values(data));
  },

  /**
   * 構建 UPDATE 語句
   * @param {string} tableName - 表名
   * @param {Object} data - 需要更新的數據
   * @param {Object} conditions - 更新條件
   * @returns {Promise<any>} - 操作結果
   */
  async update(tableName, data, conditions) {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    const sql = `UPDATE ${tableName} SET ${updates} WHERE ${whereClause}`;
    return await this.query(sql, [...Object.values(data), ...Object.values(conditions)]);
  },

  /**
   * 構建 DELETE 語句
   * @param {string} tableName - 表名
   * @param {Object} conditions - 刪除條件
   * @returns {Promise<any>} - 操作結果
   */
  async delete(tableName, conditions) {
    const whereClause = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    const sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
    return await this.query(sql, Object.values(conditions));
  },

  // 其他方法...
};

module.exports = pool;