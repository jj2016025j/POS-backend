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

        return newOrder;
    },

    async getMainOrderInfo(mainOrderId) {
        if (!mainOrderId) {
            throw new Error("mainOrderId is required");
        }
        return await mainOrderRepository.findMainOrderById(mainOrderId);
    },

    async editMainOrder(data) {
        const { mainOrderId, OrderStatus, UserId } = data;

        if (!mainOrderId || !OrderStatus) {
            throw new Error("mainOrderId and OrderStatus are required");
        }

        return await mainOrderRepository.updateOrderStatus(mainOrderId, OrderStatus, UserId);
    },

    async getRecentOrders() {
        return await mainOrderRepository.getRecentOrders();
    }
};
