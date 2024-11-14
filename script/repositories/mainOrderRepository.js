const { mainOrder } = require('../database/models');

module.exports = {
    async createMainOrder(TableId, mainOrderId) {
        return await mainOrder.create({
            TableId,
            mainOrderId,
            OrderStatus: '未結帳'
        });
    },
    async findMainOrderById(mainOrderId) {
        return await mainOrder.findByPk(mainOrderId);
    },

    async updateOrderStatus(mainOrderId, OrderStatus, UserId) {
        const mainOrder = await mainOrder.findOne({ where: { mainOrderId } });
        if (!mainOrder) throw new Error("找不到該訂單");

        mainOrder.OrderStatus = OrderStatus;
        if (UserId) mainOrder.UserId = UserId;

        return await mainOrder.save();
    },

    async getRecentOrders() {
        return await mainOrder.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
        });
    }
};
