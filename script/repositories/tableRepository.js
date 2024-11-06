const { Table, MainOrder } = require('../database/models');

module.exports = {
    async findAllTables(limit = 10) {
        return await Table.findAll({ limit });
    },

    async updateTableInfo(tableNumber, status, mainOrderId) {
        return await Table.update(
            { TablesStatus: status, MainOrderId: mainOrderId },
            { where: { TableNumber: tableNumber } }
        );
    },

    async findTableByNumber(tableNumber) {
        return await Table.findOne({ where: { TableNumber: tableNumber } });
    },

    async findTableByMainOrderId(mainOrderId) {
        const mainOrder = await MainOrder.findOne({
            where: { mainOrderId },
            include: [Table],
        });
        return mainOrder ? mainOrder.Table : null;
    },

    async resetTableStatus(tableNumber, status) {
        return await Table.update(
            { TablesStatus: status, MainOrderId: null },
            { where: { TableNumber: tableNumber } }
        );
    }
};
