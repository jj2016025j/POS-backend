const mainOrderRepository = require('../repositories/mainOrderRepository');
const tableRepository = require('../repositories/tableRepository');
const { generateMainOrderId } = require('../utils');

module.exports = {
    async createMainOrder(data) {
        const { TableNumber } = data;
        
        const table = await tableRepository.findTableByNumber(TableNumber);
        if (!table) {
            return { status: 'error', message: "找不到該桌號" };
        }

        if (table.TablesStatus !== '空桌') {
            return { status: 'unavailable', message: "該桌號目前不可用" };
        }

        const mainOrderId = generateMainOrderId();
        const newOrder = await mainOrderRepository.createMainOrder(TableNumber, mainOrderId);

        await tableRepository.updateTableInfo(TableNumber, '點餐中', mainOrderId);

        return { status: 'success', data: newOrder };
    },

    async getMainOrderInfo(MainOrderId) {
        if (!MainOrderId) {
            throw new Error("MainOrderId is required");
        }
        return await mainOrderRepository.findMainOrderById(MainOrderId);
    },

    async editMainOrder(data) {
        const { MainOrderId, OrderStatus, UserId } = data;

        if (!MainOrderId || !OrderStatus) {
            throw new Error("MainOrderId and OrderStatus are required");
        }

        return await mainOrderRepository.updateOrderStatus(MainOrderId, OrderStatus, UserId);
    },

    async getRecentOrders() {
        return await mainOrderRepository.getRecentOrders();
    }
};
