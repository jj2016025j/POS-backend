// db/reportOperations.js
const baseOperations = require('./baseOperations');
const utils = require('./utils');

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
  }
};

module.exports = reportOperations;
