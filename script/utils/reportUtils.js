// utils/reportUtils.js
const { Op, fn, col } = require('sequelize');

// 驗證查詢參數
exports.validateReportParams = ({ startTime, endTime, metric, timeUnit }) => {
    if (!startTime || !endTime || !metric || !timeUnit) {
        throw new Error('Missing required parameters');
    }
};

// 生成查詢條件
exports.generateWhereConditions = ({ startTime, endTime, category, item }) => {
    const whereConditions = {
        createdAt: {
            [Op.between]: [new Date(startTime), new Date(endTime)]
        },
    };
    if (category) whereConditions.category = category;
    if (item) whereConditions.item = item;
    return whereConditions;
};

// 設置分組條件
exports.getGroupByClause = (timeUnit) => {
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
};

// 設置統計項目欄位
exports.getMetricsColumn = (metric) => {
    switch (metric) {
        case 'revenue':
            return fn('SUM', col('revenue'));
        case 'salesQuantity':
            return fn('SUM', col('salesQuantity'));
        default:
            throw new Error('Invalid metric specified');
    }
};
