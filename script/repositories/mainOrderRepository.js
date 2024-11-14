const { mainOrder } = require('../database/models');

module.exports = {
    async createMainOrder(tableId, mainOrderId) {
        return await mainOrder.create({
            tableId,
            mainOrderId,
            orderStatus: '未結帳'
        });
    },
    async findMainOrderById(mainOrderId) {
        return await mainOrder.findByPk(mainOrderId);
    },

    async updateOrderStatus(mainOrderId, orderStatus, userId) {
        const mainOrder = await mainOrder.findOne({ where: { mainOrderId } });
        if (!mainOrder) throw new Error("找不到該訂單");

        mainOrder.orderStatus = orderStatus;
        if (userId) mainOrder.userId = userId;

        return await mainOrder.save();
    },

    async getRecentOrders() {
        return await mainOrder.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
        });
    }
};
