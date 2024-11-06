const tableRepository = require('../repositories/tableRepository');

module.exports = {
    async getAllTableInfo() {
        return await tableRepository.findAllTables();
    },

    async updateTableInfo(tableNumber, status, mainOrderId) {
        return await tableRepository.updateTableInfo(tableNumber, status, mainOrderId);
    },

    async getTableInfo(tableNumber, mainOrderId) {
        if (tableNumber) {
            return await tableRepository.findTableByNumber(tableNumber);
        } else if (mainOrderId) {
            return await tableRepository.findTableByMainOrderId(mainOrderId);
        }
        throw new Error('必須提供桌號或主訂單 ID');
    },

    async cleanTable(tableNumber, status) {
        return await tableRepository.resetTableStatus(tableNumber, status);
    },

    async resetAllTable() {
        // 調用 Repository 層的重置方法
        return await tableRepository.resetAllTables();
    },
};
