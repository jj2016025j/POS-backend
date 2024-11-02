const { DataModel } = require('../database/models');
const { validateReportParams, generateWhereConditions, getGroupByClause, getMetricsColumn } = require('../utils/reportUtils');

const getDataReport = async (req, res) => {
    const { startTime, endTime, metric, timeUnit, category, item } = req.query;

    try {
        // 驗證參數
        validateReportParams({ startTime, endTime, metric, timeUnit });

        // 生成查詢條件和分組條件
        const whereConditions = generateWhereConditions({ startTime, endTime, category, item });
        const groupBy = getGroupByClause(timeUnit);
        const metricsColumn = getMetricsColumn(metric);

        // 執行查詢
        const reportData = await DataModel.findAll({
            where: whereConditions,
            attributes: [
                [groupBy, 'timeUnit'],
                [metricsColumn, metric]
            ],
            group: ['timeUnit'],
            order: [['timeUnit', 'ASC']]
        });

        res.json(reportData);
    } catch (error) {
        console.error("Failed to fetch report data:", error);
        res.status(500).json({ error: error.message || 'Failed to fetch report data' });
    }
};

module.exports = { getDataReport };