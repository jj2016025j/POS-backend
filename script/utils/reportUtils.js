const { Op, fn, col } = require('sequelize');

const reportUtils = {
  // 確定時間區間
  determineTimeInterval(startDate, endDate) {
    const diffMs = endDate - startDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays <= 1) return 'HOUR';
    else if (diffDays <= 30) return 'DAY';
    else if (diffDays <= 180) return 'MONTH';
    return 'YEAR';
  },

  // 驗證查詢參數
  validateReportParams({ startTime, endTime, metric, timeUnit }) {
    if (!startTime || !endTime || !metric || !timeUnit) {
      throw new Error('Missing required parameters');
    }

    const allowedMetrics = ['revenue', 'salesQuantity', 'sales'];
    if (!allowedMetrics.includes(metric)) {
      throw new Error(`Invalid metric specified: ${metric}. Allowed metrics are: ${allowedMetrics.join(', ')}`);
    }

    const allowedTimeUnits = ['day', 'month', 'year'];
    if (!allowedTimeUnits.includes(timeUnit)) {
      throw new Error(`Invalid time unit specified: ${timeUnit}. Allowed time units are: ${allowedTimeUnits.join(', ')}`);
    }
  },

  // 生成查詢條件
  generateWhereConditions({ startTime, endTime, category, item }) {
    const whereConditions = {
      createdAt: {
        [Op.between]: [new Date(startTime), new Date(endTime)]
      },
    };
    if (category) whereConditions.category = category;
    if (item) whereConditions.item = item;
    return whereConditions;
  },

  // 設置分組條件
  getGroupByClause(timeUnit) {
    switch (timeUnit) {
      case 'day':
        return fn('DATE', col('createdAt'));
      case 'month':
        return fn('DATE_FORMAT', col('createdAt'), '%Y-%m');
      case 'year':
        return fn('YEAR', col('createdAt'));
      default:
        throw new Error('Invalid time unit');
    }
  },

  // 設置統計項目欄位
  getMetricsColumn(metric) {
    switch (metric) {
      case 'revenue':
        return fn('SUM', col('revenue'));
      case 'salesQuantity':
        return fn('SUM', col('salesQuantity'));
      default:
        throw new Error('Invalid metric specified');
    }
  },

  // 發送回應
  sendResponse(res, statusCode, message, data = null) {
    res.status(statusCode).json({
      status: statusCode < 400 ? 'success' : 'error',
      message: message,
      data: data,
    });
  }
};

module.exports = reportUtils;
