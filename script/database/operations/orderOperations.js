// db/orderOperations.js
const baseOperations = require('../basic/dbBasicOperations');

const orderOperations = {
  /**
   * 新增菜單項目
   * @param {Object} menuItem - 菜單項目資料
   * @param {number} categoryId - 所屬分類 ID
   * @param {number} index - 圖片索引
   * @returns {Promise<void>}
   */
  async insertMenuItem(menuItem, categoryId, index) {
    const sql = "INSERT INTO MenuItems (MenuItemName, CategoryId, Price, image_url) VALUES (?, ?, ?, ?)";
    const imageUrl = `/image/product/jpg_${index}.jpg`;
    const values = [menuItem.MenuItemName, categoryId, menuItem.Price, imageUrl];
    await baseOperations.UseMySQL(sql, values, `插入菜單項目 ${menuItem.MenuItemName}`);
  },

  /**
   * 根據主訂單 ID 獲取主訂單及其子訂單
   * @param {number} mainOrderId - 主訂單 ID
   * @returns {Promise<Object>} - 包含主訂單和子訂單的資料
   */
  async getMainAndSubOrder(mainOrderId) {
    try {
      const [mainOrder] = await baseOperations.UseMySQL(
        `SELECT * FROM MainOrders WHERE MainOrderId = ?`, [mainOrderId], `查詢主訂單 ${mainOrderId}`
      );
      const subOrders = await baseOperations.UseMySQL(
        `SELECT * FROM SubOrders WHERE MainOrderId = ?`, [mainOrderId], `查詢主訂單 ${mainOrderId} 的子訂單`
      );
      for (let subOrder of subOrders) {
        const items = await baseOperations.UseMySQL(
          `SELECT * FROM SubOrderMappings WHERE SubOrderId = ?`, [subOrder.SubOrderId], `查詢子訂單 ${subOrder.SubOrderId} 的項目`
        );
        subOrder.items = items;
      }
      return { mainOrder, subOrders };
    } catch (error) {
      console.error(error);
      throw new Error('查詢訂單時發生錯誤');
    }
  },

  /**
   * 根據訂單 ID 獲取訂單資訊
   * @param {number} orderId - 訂單 ID
   * @returns {Promise<Object>} - 訂單資訊
   */
  async getOrderById(orderId) {
    const [orders] = await baseOperations.UseMySQL(
      `SELECT id, trade_no, trade_amt FROM table_orders WHERE id = ?`, [orderId], `查詢訂單 ${orderId}`
    );
    if (!orders) throw new Error("查無此訂單");
    return orders;
  },

  /**
   * 清空訂單的菜單項目
   * @param {number} orderId - 訂單 ID
   * @returns {Promise<void>}
   */
  async clearOrderMenuItems(orderId) {
    await baseOperations.UseMySQL(
      `DELETE FROM orders_items WHERE order_id = ?`, [orderId], `清空訂單 ${orderId} 的菜單項目`
    );
  },

  /**
   * 計算訂單總價，並更新至資料庫
   * @param {number} orderId - 訂單 ID
   * @returns {Promise<void>}
   */
  async calculateOrderTotal(orderId) {
    const order = await this.getOrderById(orderId);
    const orderMenuItems = await this.getOrderMenuItems(orderId);

    if (!order || orderMenuItems.length === 0) throw new Error("查無訂單或訂單無品項");

    const menuItemPrice = orderMenuItems.reduce((total, item) => total + item.quantity * item.unit_price, 0);
    const serviceFee = Math.round(menuItemPrice * 0.1);
    const tradeAmt = menuItemPrice + serviceFee;

    await baseOperations.UseMySQL(
      `UPDATE table_orders SET food_price = ?, service_fee = ?, trade_amt = ?, order_status = ? WHERE id = ?`,
      [menuItemPrice, serviceFee, tradeAmt, 2, orderId],
      `更新訂單 ${orderId} 的總價資訊`
    );
  },

  /**
   * 獲取訂單中的所有菜單項目
   * @param {number} orderId - 訂單 ID
   * @returns {Promise<any[]>} - 菜單項目列表
   */
  async getOrderMenuItems(orderId) {
    return await baseOperations.UseMySQL(
      `SELECT * FROM orders_items WHERE order_id = ?`, [orderId], `查詢訂單 ${orderId} 的所有菜單項目`
    );
  },

  /**
   * 根據交易號查詢訂單
   * @param {string} tradeNo - 交易號
   * @returns {Promise<Object>} - 訂單資訊
   */
  async getOrderByTradeNo(tradeNo) {
    const [result] = await baseOperations.UseMySQL(
      `SELECT * FROM table_orders WHERE trade_no = ?`, [tradeNo], `查詢交易號 ${tradeNo} 的訂單`
    );
    if (!result) throw new Error("查無此交易號的訂單");
    return result;
  },

  /**
   * 刪除指定的訂單菜單項目
   * @param {number} orderId - 訂單 ID
   * @param {number} menuItemId - 菜單項目 ID
   * @returns {Promise<void>}
   */
  async deleteOrderMenuItem(orderId, menuItemId) {
    const order = await this.getOrderById(orderId);
    if (!order || order.order_status !== 1) throw new Error("此訂單已結帳或不存在");

    await baseOperations.UseMySQL(
      `DELETE FROM orders_items WHERE order_id = ? AND menu_item_id = ?`, [orderId, menuItemId], `刪除訂單 ${orderId} 中的菜單項目 ${menuItemId}`
    );
  },

  /**
   * 確認訂單的現金付款
   * @param {number} orderId - 訂單 ID
   * @returns {Promise<void>}
   */
  async confirmPaymentByCash(orderId) {
    await baseOperations.UseMySQL(
      `UPDATE table_orders SET order_status = 2 WHERE id = ?`, [orderId], `確認訂單 ${orderId} 的現金付款`
    );
  },
};

module.exports = orderOperations;
