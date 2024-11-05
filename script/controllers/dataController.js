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
        const reportData = await SubOrder.findAll({
            ...queryOptions,
            include: [
                {
                    model: MenuItem,
                    attributes: ['MenuItemName'],
                    through: { model: SubOrderItem, attributes: [] } // 僅關聯，不再獲取額外數據
                }
            ],
            attributes: [
                // 分隔改成周月

                [fn('SUM', col('SubOrderItems.quantity')), 'salesQuantity'], // 計算銷售數量
                [fn('SUM', fn('MULTIPLY', col('SubOrderItems.quantity'), col('SubOrderItems.price'))), 'sales'] // 計算總銷售額
            ],
            group: queryOptions.group, // 使用生成的主要分組鍵
            order: [['timeUnit', 'ASC']]
        });

        res.status(200).json({ message: '報告生成成功', data: reportData });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDataReport };
