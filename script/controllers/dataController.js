const { SubOrder, MenuItem, SubOrderItem } = require('../database/models'); // 確保引入所有相關模型
const { validateReportParams, generateQueryOptions } = require('../utils/reportUtils');
const { fn, col } = require('sequelize');

const getDataReport = async (req, res, next) => {
    const params = req.body;

    try {
        // 驗證查詢參數
        await validateReportParams(params);

        // 生成查詢選項
        const queryOptions = generateQueryOptions(params);

        // 執行查詢，從子訂單中統計銷售數量和銷售額
        const reportData = await SubOrder.findAll({});

        res.status(200).json(reportData);
    } catch (error) {
        next(error);
    }
};

module.exports = { getDataReport };
