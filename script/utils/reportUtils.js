const { Op, fn, col } = require('sequelize');
const Joi = require('joi');
const { METRICS, TIME_UNITS } = require('./constants');

module.exports = {
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
  validateReportParams(params) {
    const schema = Joi.object({
      startTime: Joi.date().required(),
      endTime: Joi.date().required(),
      metric: Joi.array().items(Joi.string().valid(METRICS.SALES_QUANTITY, METRICS.SALES)).min(1).required(),
      timeUnit: Joi.string().valid(TIME_UNITS.DAY, TIME_UNITS.MONTH, TIME_UNITS.YEAR).default(TIME_UNITS.DAY),
      category: Joi.string().valid('category', 'item', 'none').default('none'),
      item: Joi.array().items(Joi.string()).when('category', { is: 'none', then: Joi.forbidden() })
    });
    return schema.validateAsync(params);
  },

  // 查詢條件生成器
  generateQueryOptions({ startTime, endTime, metric, timeUnit, category, item }) {
    const whereConditions = {
      createdAt: {
        [Op.between]: [new Date(startTime), new Date(endTime)]
      },
    };

    // 設置分組條件
    let groupBy;
    switch (timeUnit) {
      case TIME_UNITS.DAY:
        groupBy = fn('DATE', col('createdAt'));
        break;
      case TIME_UNITS.MONTH:
        groupBy = fn('DATE_FORMAT', col('createdAt'), '%Y-%m');
        break;
      case TIME_UNITS.YEAR:
        groupBy = fn('YEAR', col('createdAt'));
        break;
    }

    // 根據 category 和 item 設置分組和條件
    if (category === 'category') {
      groupBy = [groupBy, col('category')];
      if (item && item.length) whereConditions.category = { [Op.in]: item };
    } else if (category === 'item') {
      groupBy = [groupBy, col('item')];
      if (item && item.length) whereConditions.item = { [Op.in]: item };
    }

    // 設置聚合欄位
    const metricsColumns = metric.map((m) => {
      return [fn('SUM', col(m)), m];
    });

    return {
      where: whereConditions,
      group: groupBy,
      attributes: [[groupBy, 'timeUnit'], ...metricsColumns],
      order: [['timeUnit', 'ASC']]
    };
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

