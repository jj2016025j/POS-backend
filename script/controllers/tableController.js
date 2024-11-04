const { Table, MainOrder } = require('../database/models');

module.exports = {
    // 取得所有桌位狀態
    async getAllTableInfo(req, res) {
        try {
            const tables = await Table.findAll({ limit: 10 });
            res.status(200).json(tables);
        } catch (error) {
            console.error("Error in getAllTableInfo:", error);
            res.status(500).json({ message: '取得桌位資訊失敗', error });
        }
    },

    // 更新桌位資訊（桌號狀態和主訂單 ID）
    async updateTableInfo(req, res) {
        const { tableNumber, status, mainOrderId } = req.body;
        try {
            await Table.update(
                { TablesStatus: status, MainOrderId: mainOrderId },
                { where: { TableNumber: tableNumber } }
            );
            res.status(200).json({
                message: "桌位資訊已成功更新",
                tableNumber:tableNumber,
                TablesStatus: status, 
                MainOrderId: mainOrderId,
            });
        } catch (error) {
            console.error("Error in updateTableInfo:", error);
            res.status(500).json({ message: '更新桌位資訊失敗', error });
        }
    },

    // 更新桌位狀態
    async updateTableStatus(req, res) {
        const { tableNumber, status, mainOrderId = null } = req.body;
        try {
            const table = await Table.findOne({ where: { TableNumber: tableNumber } });
            if (table) {
                table.TablesStatus = status;
                table.MainOrderId = mainOrderId;
                await table.save();
                res.status(200).json({ message: '桌位狀態已成功更新', table });
            } else {
                res.status(404).json({ message: '找不到該桌位' });
            }
        } catch (error) {
            console.error("Error in updateTableStatus:", error);
            res.status(500).json({ message: '更新桌位狀態失敗', error });
        }
    },

    // 取得指定桌號資訊
    async getTableInfoByTableNumber(req, res) {
        const { tableNumber } = req.params;
        try {
            const table = await Table.findOne({ where: { TableNumber: tableNumber } });
            if (table) {
                res.status(200).json(table);
            } else {
                res.status(404).json({ message: '找不到該桌位' });
            }
        } catch (error) {
            console.error("Error in getTableInfoByTableNumber:", error);
            res.status(500).json({ message: '取得桌位資訊失敗', error });
        }
    },

    // 根據主訂單 ID 查詢桌位資訊
    async getTableInfoByMainOrderId(req, res) {
        const { mainOrderId } = req.params;
        try {
            const mainOrder = await MainOrder.findOne({
                where: { id: mainOrderId },
                include: [Table],
            });
            if (mainOrder?.Table) {
                res.status(200).json(mainOrder.Table);
            } else {
                res.status(404).json({ message: '找不到對應的桌位' });
            }
        } catch (error) {
            console.error("Error in getTableInfoByMainOrderId:", error);
            res.status(500).json({ message: '取得桌位資訊失敗', error });
        }
    },

    // 清潔桌位（重置桌位狀態）
    async cleanTable(req, res) {
        const { tableNumber, status = '空桌' } = req.body;
        try {
            await Table.update(
                { TablesStatus: status, MainOrderId: null },
                { where: { TableNumber: tableNumber } }
            );
            res.status(200).json({ message: '桌位已清潔並重置狀態' });
        } catch (error) {
            console.error("Error in cleanTable:", error);
            res.status(500).json({ message: '清潔桌位失敗', error });
        }
    }
};
