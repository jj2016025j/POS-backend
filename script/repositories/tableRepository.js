const { table, mainOrder } = require('../database/models');

module.exports = {
    async findAllTables(limit = 100) {
        return await table.findAll({ limit });
    },

    async updateTableInfo(tableNumber, status, mainOrderId) {
        return await table.update(
            { TablesStatus: status, mainOrderId: mainOrderId },
            { where: { TableNumber: tableNumber } }
        );
    },

    async findTableByNumber(tableNumber) {
        return await table.findOne({ where: { TableNumber: tableNumber } });
    },

    async findTableByMainOrderId(mainOrderId) {
        const mainOrder = await mainOrder.findOne({
            where: { mainOrderId },
            include: [table],
        });
        return mainOrder ? mainOrder.table : null;
    },

    async resetTableStatus(tableNumber, status) {
        return await table.update(
            { TablesStatus: status, mainOrderId: null },
            { where: { TableNumber: tableNumber } }
        );
    },

    async resetAllTables() {
        // 將所有桌位的狀態設為空桌，並清空訂單
        return await table.update(
            { TablesStatus: '空桌', mainOrderId: null },
            { where: {} } // 沒有條件，會更新所有桌位
        );
    },

    async resetTableByOrder(tableId) {
        return await table.update(
            { TablesStatus: '空桌', mainOrderId: null },
            { where: { id: tableId } }
        );
    },

    async updateTableStatus(tableId, status) {
        return await table.update(
            { TablesStatus: status },
            { where: { id: tableId } }
        );
    }
};
