// db/categoryOperations.js
const baseOperations = require('../basic/dbBasicOperations');

const categoryOperations = {
  /**
   * 插入新分類
   * @param {Object} category - 分類資訊
   * @returns {Promise<void>}
   */
  async insertCategory(category) {
    const sql = 'INSERT INTO Categories (CategoryName, Description) VALUES (?, ?)';
    const values = [category.CategoryName, category.Description];
    await baseOperations.query(sql, values, `插入分類 ${category.CategoryName}`);
  },

  /**
   * 查詢分類
   * @param {string[]} columns - 需要查詢的列
   * @param {Object} conditions - 查詢條件
   * @returns {Promise<any[]>} - 查詢結果
   */
  async selectCategories(columns = '*', conditions = null) {
    return await baseOperations.select('Categories', columns, conditions);
  },

  /**
   * 更新分類
   * @param {Object} updates - 更新的資料
   * @param {Object} conditions - 更新條件
   * @returns {Promise<void>}
   */
  async updateCategory(updates, conditions) {
    const updateFields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const conditionFields = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    const sql = `UPDATE Categories SET ${updateFields} WHERE ${conditionFields}`;
    const values = [...Object.values(updates), ...Object.values(conditions)];
    await baseOperations.query(sql, values, `更新分類`);
  },

  /**
   * 刪除分類
   * @param {Object} conditions - 刪除條件
   * @returns {Promise<void>}
   */
  async deleteCategory(conditions) {
    const conditionFields = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    const sql = `DELETE FROM Categories WHERE ${conditionFields}`;
    const values = Object.values(conditions);
    await baseOperations.query(sql, values, `刪除分類`);
  },
};

module.exports = categoryOperations;
