// db/reportOperations.js
const baseOperations = require('./baseOperations');
const utils = require('./utils');
const moment = require('moment');

const reportOperations = {
  async getBackEndData(timeRange, queryType) {
    const timeCondition = utils.generateTimeCondition(timeRange, 'MainOrders');
    let sql = '';
    switch (queryType) {
      case 'all':
        sql = `SELECT DATE_FORMAT(MainOrders.CreateTime, '%Y-%m-%d') AS OrderDate,
             SUM(MainOrderMappings.quantity) AS TotalQuantity,
             SUM(MainOrderMappings.total_price) AS TotalSales
             FROM MainOrders
             JOIN MainOrderMappings ON MainOrders.MainOrderId = MainOrderMappings.MainOrderId
             WHERE ${timeCondition}
             GROUP BY OrderDate
             ORDER BY OrderDate`;
        break;
      case 'byCategory':
        sql = `SELECT Category.CategoryName,
             DATE_FORMAT(MainOrders.CreateTime, '%Y-%m-%d') AS OrderDate,
             SUM(MainOrderMappings.quantity) AS TotalQuantity,
             SUM(MainOrderMappings.total_price) AS TotalSales
             FROM MainOrders
             JOIN MainOrderMappings ON MainOrders.MainOrderId = MainOrderMappings.MainOrderId
             JOIN MenuItems ON MainOrderMappings.MenuItemId = MenuItems.Id
             JOIN Category ON MenuItems.CategoryId = Category.Id
             WHERE ${timeCondition}
             GROUP BY Category.CategoryName, OrderDate
             ORDER BY Category.CategoryName, OrderDate`;
        break;
      case 'byItem':
        sql = `SELECT MenuItemName,
             SUM(MainOrderMappings.quantity) AS TotalQuantity,
             SUM(MainOrderMappings.total_price) AS TotalSales
             FROM MainOrderMappings
             JOIN MenuItems ON MainOrderMappings.MenuItemId = MenuItems.Id
             JOIN MainOrders ON MainOrders.MainOrderId = MainOrderMappings.MainOrderId
             WHERE ${timeCondition}
             GROUP BY MenuItemName
             ORDER BY SUM(MainOrderMappings.total_price) DESC`;
        break;
      default:
        throw new Error('Invalid query type');
    }
    return await baseOperations.UseMySQL(sql, [], `执行 ${timeRange} 销售信息 ${queryType} 查询`);
  }, getReport: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let m12_start = moment().startOf('month').subtract(12, 'months').format('YYYY-MM-DD 00:00:00');
        let m12_end = moment().endOf('month').format('YYYY-MM-DD 23:59:59');

        const dayTurnoverSql = `SELECT SUM(trade_amt) as trade_amt FROM table_orders WHERE DATE(payment_at) = CURDATE() AND order_status = 2`;
        const monthTurnoverSql = `SELECT SUM(trade_amt) as trade_amt FROM table_orders WHERE MONTH(payment_at) = MONTH(CURDATE()) AND YEAR(payment_at) = YEAR(CURDATE()) AND order_status = 2`;
        const rankTop5Sql = `SELECT food_id, SUM(quantity) as total FROM orders_items oi LEFT JOIN table_orders o ON o.id = oi.order_id WHERE o.order_status = 2 AND YEAR(payment_at) = YEAR(CURDATE()) AND MONTH(payment_at) = MONTH(CURDATE()) GROUP BY food_id ORDER BY total DESC LIMIT 5`;
        const monthTurnoverOfYearSql = `SELECT YEAR(payment_at) as year, MONTH(payment_at) as month, SUM(trade_amt) as price FROM table_orders WHERE (payment_at BETWEEN '${m12_start}' AND '${m12_end}') AND order_status = 2 GROUP BY YEAR(payment_at), MONTH(payment_at)`;

        // Execute each SQL query one by one
        const dayTurnoverResult = await pool.UseMySQL(dayTurnoverSql);
        const monthTurnoverResult = await pool.UseMySQL(monthTurnoverSql);
        const rankTop5Result = await pool.UseMySQL(rankTop5Sql);
        const monthTurnoverOfYearResult = await pool.UseMySQL(monthTurnoverOfYearSql);

        resolve({
          dayTurnover: dayTurnoverResult[0].trade_amt || 0,
          monthTurnover: monthTurnoverResult[0].trade_amt || 0,
          rankTop5: rankTop5Result,
          monthTurnoverOfYear: monthTurnoverOfYearResult
        });
      } catch (error) {
        reject(error);
      }
    });
  },

};

module.exports = reportOperations;
