// db/orderOperations.js
const baseOperations = require('./baseOperations');

const orderOperations = {
  async insertIntoMenuItem(menuItem, categoryId, index) {
    const sql = "INSERT INTO MenuItems (MenuItemName, CategoryId, Price, image_url) VALUES (?, ?, ?, ?)";
    const imageUrl = `/image/product/jpg_${index}.jpg`;
    const values = [menuItem.MenuItemName, categoryId, menuItem.Price, imageUrl];
    await baseOperations.UseMySQL(sql, values, `插入 ${menuItem.MenuItemName}`);
  },

  async getMainAndSubOrder(mainOrderId) {
    try {
      const [mainOrder] = await baseOperations.UseMySQL(
        `SELECT * FROM MainOrders WHERE MainOrderId = ?`, [mainOrderId], `查询主订单 ${mainOrderId}`
      );
      const subOrders = await baseOperations.UseMySQL(
        `SELECT * FROM SubOrders WHERE MainOrderId = ?`, [mainOrderId], `查询主订单 ${mainOrderId} 的子订单`
      );
      for (let subOrder of subOrders) {
        const items = await baseOperations.UseMySQL(
          `SELECT * FROM SubOrderMappings WHERE SubOrderId = ?`, [subOrder.SubOrderId], `查询子订单 ${subOrder.SubOrderId} 的项目信息`
        );
        subOrder.items = items;
      }
      return { mainOrder, subOrders };
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  },


  async getOrderInfo(orderId) {
    const [orders] = await pool.query(`SELECT id, trade_no, trade_amt FROM table_orders WHERE id = ?`, [orderId]);
    if (orders.length === 0) throw new Error("Order not found");
    return orders[0];
  },

};

module.exports = orderOperations;
