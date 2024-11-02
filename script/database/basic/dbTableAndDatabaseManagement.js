const pool = require('./connection');

const dbTableAndDatabaseManagement = {
  getConnection() {
    return pool;
  },

  closeConnection() {
    return pool.end();
  },

  /**
   * 創建數據庫（如果不存在）
   * @param {string} databaseName - 數據庫名稱
   */
  async createDatabase(databaseName) {
    const sql = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
    try {
      await this.query(sql);
      console.log(`數據庫 ${databaseName} 創建成功。`);
    } catch (error) {
      console.error(`創建數據庫 ${databaseName} 失敗:`, error);
      throw error;
    }
  },

  /**
   * 選擇數據庫
   * @param {string} databaseName - 數據庫名稱
   */
  async useDatabase(databaseName) {
    try {
      await this.query(`USE ${databaseName}`);
      console.log(`已切換到數據庫 ${databaseName}`);
    } catch (error) {
      console.error(`切換數據庫時出錯: ${error.message}`);
      throw error;
    }
  },

  /**
   * 創建數據表
   * @param {string} tableName - 表名
   * @param {string} tableDefinition - 表定義
   */
  async createTable(tableName, tableDefinition) {
    const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`;
    try {
      await this.query(sql);
      console.log(`數據表 ${tableName} 創建成功。`);
    } catch (error) {
      console.error(`創建數據表 ${tableName} 失敗:`, error);
      throw error;
    }
  },

  /**
   * 修改表字符集和排序規則
   * @param {string} tableName - 表名
   * @param {string} charset - 字符集
   * @param {string} collate - 校對規則
   */
  async alterTableCharset(tableName, charset = 'utf8mb4', collate = 'utf8mb4_unicode_ci') {
    const sql = `ALTER TABLE ${tableName} CONVERT TO CHARACTER SET ${charset} COLLATE ${collate}`;
    try {
      await this.query(sql);
      console.log(`表 ${tableName} 的字符集已更改為 ${charset}，校對規則為 ${collate}`);
    } catch (error) {
      console.error(`修改表 ${tableName} 的字符集失敗:`, error);
      throw error;
    }
  },

  /**
   * 清空數據表
   * @param {string} tableName - 表名
   */
  async truncateTable(tableName) {
    const sql = `TRUNCATE TABLE ${tableName}`;
    try {
      await this.query(sql);
      console.log(`數據表 ${tableName} 已清空。`);
    } catch (error) {
      console.error(`清空數據表 ${tableName} 失敗:`, error);
      throw error;
    }
  },

  /**
   * 刪除數據表
   * @param {string} tableName - 表名
   */
  async dropTable(tableName) {
    const sql = `DROP TABLE IF EXISTS ${tableName}`;
    try {
      await this.query(sql);
      console.log(`數據表 ${tableName} 已刪除。`);
    } catch (error) {
      console.error(`刪除數據表 ${tableName} 失敗:`, error);
      throw error;
    }
  },

  /**
   * 刪除所有表
   */
  async dropAllTables() {
    try {
      const [tables] = await this.query('SHOW TABLES');
      for (let table of tables) {
        const tableName = Object.values(table)[0]; // SHOW TABLES 結果的格式取決於您的數據庫配置
        await this.dropTable(tableName);
        console.log(`數據表 ${tableName} 已刪除。`);
      }
      console.log(`數據庫中的所有表已清空。`);
    } catch (error) {
      console.error(`清空數據庫失敗:`, error);
    }
  },

  /**
   * 修改資料庫字符集和排序規則
   * @param {string} databaseName - 資料庫名稱
   * @param {string} charset - 字符集
   * @param {string} collate - 校對規則
   */
  async alterDatabaseCharset(databaseName, charset = 'utf8mb4', collate = 'utf8mb4_unicode_ci') {
    const sql = `ALTER DATABASE ${databaseName} CHARACTER SET ${charset} COLLATE ${collate}`;
    try {
      await this.query(sql);
      console.log(`資料庫 ${databaseName} 的字符集已更改為 ${charset}，校對規則為 ${collate}`);
    } catch (error) {
      console.error(`修改資料庫 ${databaseName} 的字符集失敗:`, error);
      throw error;
    }
  },

  /**
   * 刪除資料庫（如果存在）
   * @param {string} databaseName - 資料庫名稱
   */
  async dropDatabase(databaseName) {
    const sql = `DROP DATABASE IF EXISTS ${databaseName}`;
    try {
      await this.query(sql);
      console.log(`資料庫 ${databaseName} 已刪除。`);
    } catch (error) {
      console.error(`刪除資料庫 ${databaseName} 失敗:`, error);
      throw error;
    }
  },
};

module.exports = dbTableAndDatabaseManagement;