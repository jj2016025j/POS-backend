// utils/timeUtils.js

// 生成時間範圍條件
function generateTimeCondition(timeRange, tableName = 'MainOrders') {
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
}

// 格式化日期時間，格式 "2024-03-23 21:45:47"
function TimeFormat(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  }).replace(/\//g, '-');
}

// 格式化日期時間，格式 "2024/03/23 21:45:47"
function TimeFormat2(isoString) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
  }).format(date);
}

module.exports = { generateTimeCondition, TimeFormat, TimeFormat2 };
