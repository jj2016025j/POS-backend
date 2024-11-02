// db/menuOperations.js
const baseOperations = require('../basic/dbBasicOperations');

const menuOperations = {
  /**
   * 插入菜單項目
   * @param {Object} menuItem - 菜單項目內容
   * @param {number} categoryId - 所屬分類 ID
   * @param {number} index - 圖片索引號
   * @returns {Promise<void>}
   */
  async insertMenuItem(menuItem, categoryId, index) {
    const sql = 'INSERT INTO MenuItems (MenuItemName, CategoryId, Price, image_url) VALUES (?, ?, ?, ?)';
    const imageUrl = `/image/product/jpg_${index}.jpg`;
    const values = [menuItem.MenuItemName, categoryId, menuItem.Price, imageUrl];
    await baseOperations.query(sql, values, `插入菜單項目 ${menuItem.MenuItemName}`);
  },

  /**
   * 查詢菜單項目
   * @param {string[]} columns - 需要查詢的列
   * @param {Object} conditions - 查詢條件
   * @returns {Promise<any[]>} - 查詢結果
   */
  async selectMenuItems(columns = '*', conditions = null) {
    return await baseOperations.select('MenuItems', columns, conditions);
  },

  /**
   * 更新菜單項目
   * @param {Object} updates - 更新的資料
   * @param {Object} conditions - 更新條件
   * @returns {Promise<void>}
   */
  async updateMenuItem(updates, conditions) {
    const updateFields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const conditionFields = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    const sql = `UPDATE MenuItems SET ${updateFields} WHERE ${conditionFields}`;
    const values = [...Object.values(updates), ...Object.values(conditions)];
    await baseOperations.query(sql, values, `更新菜單項目`);
  },

  /**
   * 刪除菜單項目
   * @param {Object} conditions - 刪除條件
   * @returns {Promise<void>}
   */
  async deleteMenuItem(conditions) {
    const conditionFields = Object.keys(conditions).map(key => `${key} = ?`).join(' AND ');
    const sql = `DELETE FROM MenuItems WHERE ${conditionFields}`;
    const values = Object.values(conditions);
    await baseOperations.query(sql, values, `刪除菜單項目`);
  },
};

module.exports = menuOperations;
