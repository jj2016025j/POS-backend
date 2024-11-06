const { getAllTableInfo, getTableInfo, updateTableInfo, cleanTable } = require('../services/tableService');

module.exports = {
    // 取得所有桌位狀態
    async getAllTableInfo(req, res) {
        try {
            const tables = await getAllTableInfo();
            res.status(200).json(tables);
        } catch (error) {
            console.error("Error in getAllTableInfo:", error);
            res.status(500).json({ message: '取得桌位資訊失敗', error });
        }
    },

    // 取得指定桌號資訊
    async getTableInfo(req, res) {
        const { tableNumber, mainOrderId } = req.body;
        try {
            const table = await getTableInfo(tableNumber, mainOrderId);
            if (table) {
                res.status(200).json(table);
            } else {
                res.status(404).json({ message: '找不到該桌位' });
            }
        } catch (error) {
            console.error("Error in getTableInfo:", error);
            res.status(500).json({ message: '取得桌位資訊失敗', error });
        }
    },

    // 更新桌位資訊（桌號狀態和主訂單 ID）
    async updateTableInfo(req, res) {
        const { tableNumber, status, mainOrderId } = req.body;
        try {
            await updateTableInfo(tableNumber, status, mainOrderId);
            res.status(200).json(req.body);
        } catch (error) {
            console.error("Error in updateTableInfo:", error);
            res.status(500).json({ message: '更新桌位資訊失敗', error });
        }
    },

    // 清潔桌位（重置桌位狀態）
    async cleanTable(req, res) {
        const { tableNumber, status = '空桌' } = req.body;
        try {
            await cleanTable(tableNumber, status);
            res.status(200).json(req.body);
        } catch (error) {
            console.error("Error in cleanTable:", error);
            res.status(500).json({ message: '清潔桌位失敗', error });
        }
    }
};
