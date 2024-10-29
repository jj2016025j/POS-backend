// db/utils.js
const utils = {
    generateTimeCondition(timeRange, tableName = 'MainOrders') {
      switch (timeRange) {
        case 'last24Hours':
          return `${tableName}.CreateTime >= NOW() - INTERVAL 24 HOUR`;
        case 'lastWeek':
          return `${tableName}.CreateTime >= CURDATE() - INTERVAL 7 DAY`;
        case 'lastMonth':
          return `${tableName}.CreateTime >= CURDATE() - INTERVAL 1 MONTH`;
        case 'last6Months':
          return `${tableName}.CreateTime >= CURDATE() - INTERVAL 6 MONTH`;
        case 'lastYear':
          return `${tableName}.CreateTime >= CURDATE() - INTERVAL 1 YEAR`;
        case 'all':
          return '1=1';
        default:
          throw new Error('Invalid time range');
      }
    },
  };
  
  module.exports = utils;
  