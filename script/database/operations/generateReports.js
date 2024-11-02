// db/generateReports.js
const pool = require('../basic/dbBasicOperations');
const { generateTimeGroupClause, generateSalesReportQuery } = require('./reportQueries');
const { determineTimeInterval } = require('../../utils/dataUtils');

// 基本銷售報表生成
async function generateSalesReport(type, startDate, endDate = new Date()) {
  const sql = generateSalesReportQuery(type, startDate, endDate);
  return await pool.UseMySQL(sql);
}

// 針對菜單項目銷售情況生成報表
async function generateMenuItemSalesReport(order = 'DESC', limit = 10) {
  const sql = `SELECT MenuItemId, MenuItems.MenuItemName, SUM(quantity) AS TotalQuantitySold, SUM(total_price) AS TotalRevenue
               FROM MainOrderMappings
               JOIN MenuItems ON MainOrderMappings.MenuItemId = MenuItems.Id
               GROUP BY MenuItemId
               ORDER BY TotalQuantitySold ${order}
               LIMIT ${limit};`;
  return await pool.UseMySQL(sql);
}

// 類別銷售情況生成報表
async function generateCategorySalesReport() {
  const sql = `SELECT Category.Id AS CategoryId, Category.CategoryName, SUM(MainOrderMappings.quantity) AS TotalQuantity, SUM(MainOrderMappings.total_price) AS TotalSales
               FROM MainOrderMappings
               JOIN MenuItems ON MainOrderMappings.MenuItemId = MenuItems.Id
               JOIN Category ON MenuItems.CategoryId = Category.Id
               GROUP BY CategoryId
               ORDER BY TotalSales DESC;`;
  return await pool.UseMySQL(sql);
}

// 動態生成銷售報表
async function generateDynamicSalesReport(startDate, endDate, categoryType = 'all', categoryIds = []) {
  const interval = determineTimeInterval(startDate, endDate);
  const timeGroupClause = generateTimeGroupClause(interval);

  let whereClause = `CreateTime BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`;
  if (categoryType === 'category') whereClause += ` AND MenuItems.CategoryId IN (${categoryIds.join(',')})`;
  else if (categoryType === 'item') whereClause += ` AND MenuItems.Id IN (${categoryIds.join(',')})`;

  const sql = `
    SELECT ${timeGroupClause} AS time, SUM(quantity) AS totalQuantity, SUM(total_price) AS totalPrice
    FROM MainOrderMappings
    JOIN MenuItems ON MainOrderMappings.MenuItemId = MenuItems.Id
    WHERE ${whereClause}
    GROUP BY time
    ORDER BY time;
  `;

  return await pool.UseMySQL(sql);
}

module.exports = {
  generateSalesReport,
  generateMenuItemSalesReport,
  generateCategorySalesReport,
  generateDynamicSalesReport
};