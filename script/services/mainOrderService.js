const mainOrderRepository = require('../repositories/mainOrderRepository');
const tableRepository = require('../repositories/tableRepository');
const { generateMainOrderId } = require('../utils');

module.exports = {
    async createMainOrder(data) {
        const { tableNumber } = data;
        
        const table = await tableRepository.findTableByNumber(tableNumber);
        if (!table) {
            return { status: 'error', message: "找不到該桌號" };
        }

        if (table.tablesStatus !== '空桌') {
            return { status: 'unavailable', message: "該桌號目前不可用" };
        }

        const mainOrderId = generateMainOrderId();
        const newOrder = await mainOrderRepository.createMainOrder(tableNumber, mainOrderId);

        await tableRepository.updateTableInfo(tableNumber, '點餐中', mainOrderId);

        return newOrder;
    },

    async getMainOrderInfo(mainOrderId) {
        if (!mainOrderId) {
            throw new Error("mainOrderId is required");
        }
        return await mainOrderRepository.findMainOrderById(mainOrderId);
    },

    async editMainOrder(data) {
        const { mainOrderId, orderStatus, userId } = data;

        if (!mainOrderId || !orderStatus) {
            throw new Error("mainOrderId and orderStatus are required");
        }

        return await mainOrderRepository.updateOrderStatus(mainOrderId, orderStatus, userId);
    },

    async getRecentOrders() {
        return await mainOrderRepository.getRecentOrders();
    }
};
