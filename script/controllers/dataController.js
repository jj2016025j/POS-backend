const { DataModel } = require('../database/models');
const { validateReportParams, generateWhereConditions, getGroupByClause, getMetricsColumn } = require('../utils');

const getDataReport = async (req, res) => {
    const { startTime, endTime, metric, timeUnit = 'day', category, item } = req.body; // 使用請求體參數

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
                [groupBy, 'timeUnit'],  // 分組條件
                [metricsColumn, metric]  // 指標欄位
            ],
            group: ['timeUnit'],
            order: [['timeUnit', 'ASC']]
        });

        res.status(200).json({ message: '報告生成成功', data: reportData });
    } catch (error) {
        console.error("報告生成失敗:", error);
        res.status(500).json({ error: error.message || '無法生成報告資料' });
    }
};

module.exports = { getDataReport };
