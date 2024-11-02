// db/reportQueries.js

// 生成時間區間的SQL片段
function generateTimeGroupClause(interval) {
    switch (interval) {
      case 'HOUR': return "DATE_FORMAT(CreateTime, '%Y-%m-%d %H:00')";
      case 'DAY': return "DATE_FORMAT(CreateTime, '%Y-%m-%d')";
      case 'MONTH': return "DATE_FORMAT(CreateTime, '%Y-%m')";
      case 'YEAR': return "DATE_FORMAT(CreateTime, '%Y')";
      default: return "DATE_FORMAT(CreateTime, '%Y-%m-%d')";
    }
  }
  
  // 根據報表類型生成SQL查詢
  function generateSalesReportQuery(type, startDate, endDate) {
    let sql = '';
  
    switch (type) {
      case 'daily':
        sql = `SELECT DATE(CreateTime) AS Date, COUNT(*) AS TotalOrders, SUM(Total) AS TotalSales, AVG(Total) AS AverageSale
               FROM MainOrders
               WHERE CreateTime BETWEEN '${startDate}' AND '${endDate}'
               GROUP BY Date ORDER BY Date;`;
        break;
      case 'hourly':
        sql = `SELECT HOUR(CreateTime) AS Hour, SUM(Total) AS TotalSales, COUNT(*) AS TotalOrders
               FROM MainOrders
               WHERE DATE(CreateTime) = '${startDate}'
               GROUP BY Hour ORDER BY Hour;`;
        break;
      case 'monthly':
        sql = `SELECT DATE_FORMAT(CreateTime, '%Y-%m') AS Month, SUM(Total) AS TotalSales
               FROM MainOrders
               GROUP BY Month ORDER BY Month;`;
        break;
      default:
        throw new Error('Unsupported report type');
    }
  
    return sql;
  }
  
  module.exports = { generateTimeGroupClause, generateSalesReportQuery };
  