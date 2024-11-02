// services/tableController.js
const { Table, MainOrder } = require('../models');

module.exports = {
    // 更新桌位狀態
    async updateTableStatus(tableNumber, status, mainOrderId = null) {
        const table = await Table.findOne({ where: { TableNumber: tableNumber } });
        if (table) {
            table.TablesStatus = status;
            table.MainOrderId = mainOrderId;
            await table.save();
        }
        return table;
    },

    // 更新桌位資訊（桌號狀態和主訂單 ID）
    async updateTableInfo(tableNumber, status, mainOrderId) {
        await Table.update(
            { TablesStatus: status, MainOrderId: mainOrderId },
            { where: { TableNumber: tableNumber } }
        );
    },

    // 取得指定桌號資訊
    async getTableInfoByTableNumber(tableNumber) {
        return await Table.findOne({ where: { TableNumber: tableNumber } });
    },

    // 根據主訂單 ID 查詢桌位資訊
    async getTableInfoByMainOrderId(mainOrderId) {
        const mainOrder = await MainOrder.findOne({
            where: { id: mainOrderId },
            include: [Table],
        });
        return mainOrder?.Table || null;
    },

    // 取得所有桌位狀態
    async getAllTableInfo() {
        return await Table.findAll();
    },

    // 清潔桌位（重置桌位狀態）
    async cleanTable(tableNumber, status = '空桌') {
        await Table.update(
            { TablesStatus: status, MainOrderId: null },
            { where: { TableNumber: tableNumber } }
        );
    }
};
