const { Table, mainOrder } = require('../database/models');

module.exports = {
    async findAllTables(limit = 100) {
        return await Table.findAll({ limit });
    },

    async updateTableInfo(tableNumber, status, mainOrderId) {
        return await Table.update(
            { TablesStatus: status, mainOrderId: mainOrderId },
            { where: { TableNumber: tableNumber } }
        );
    },

    async findTableByNumber(tableNumber) {
        return await Table.findOne({ where: { TableNumber: tableNumber } });
    },

    async findTableByMainOrderId(mainOrderId) {
        const mainOrder = await mainOrder.findOne({
            where: { mainOrderId },
            include: [Table],
        });
        return mainOrder ? mainOrder.Table : null;
    },

    async resetTableStatus(tableNumber, status) {
        return await Table.update(
            { TablesStatus: status, mainOrderId: null },
            { where: { TableNumber: tableNumber } }
        );
    },

    async resetAllTables() {
        // 將所有桌位的狀態設為空桌，並清空訂單
        return await Table.update(
            { TablesStatus: '空桌', mainOrderId: null },
            { where: {} } // 沒有條件，會更新所有桌位
        );
    },

    async resetTableByOrder(TableId) {
        return await Table.update(
            { TablesStatus: '空桌', mainOrderId: null },
            { where: { Id: TableId } }
        );
    },

    async updateTableStatus(TableId, status) {
        return await Table.update(
            { TablesStatus: status },
            { where: { Id: TableId } }
        );
    }
};
