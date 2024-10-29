// db/baseOperations.js
// 匯入連接池模組，用於與資料庫建立連接
const pool = require('./connection');

const baseOperations = {
  /**
   * 通用的資料庫操作方法
   * @param {string} sql - 要執行的 SQL 語句
   * @param {Array} values - SQL 語句中使用的參數
   * @param {string} explain - 操作說明，用於記錄執行說明
   * @returns {Object|Array} - 返回查詢結果或受影響的行數
   */
  async UseMySQL(sql, values = [], explain = "") {
    try {
      const [results] = await pool.query(sql, values);
      console.log(`${explain}`); // 輸出操作說明
      // 如果 SQL 語句為查詢類型，返回結果；否則返回影響的行數
      return sql.trim().toLowerCase().startsWith("select") ? results : { affectedRows: results.affectedRows };
    } catch (error) {
      console.error('資料庫操作失敗:', error);
      throw error;
    }
  },

  /**
   * 建立資料表
   * @param {string} tableName - 資料表名稱
   * @param {string} tableDefinition - 資料表的欄位定義
   */
  async createTable(tableName, tableDefinition) {
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`;
    await this.UseMySQL(sql, [], `建立資料表 ${tableName}`);
  },

  /**
   * 清空資料表
   * @param {string} tableName - 資料表名稱
   */
  async truncateTable(tableName) {
    await this.UseMySQL(`TRUNCATE TABLE ${tableName}`, [], `清空資料表 ${tableName}`);
  },
};

// 匯出模組，以便在其他文件中使用
module.exports = baseOperations;
