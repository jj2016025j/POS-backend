const { MainOrder } = require('../database/models');

module.exports = {
    async createMainOrder(TableId, MainOrderId) {
        return await MainOrder.create({
            TableId,
            MainOrderId,
            OrderStatus: '未結帳'
        });
    },
    async findMainOrderById(MainOrderId) {
        return await MainOrder.findByPk(MainOrderId);
    },

    async updateOrderStatus(MainOrderId, OrderStatus, UserId) {
        const mainOrder = await MainOrder.findOne({ where: { MainOrderId } });
        if (!mainOrder) throw new Error("找不到該訂單");

        mainOrder.OrderStatus = OrderStatus;
        if (UserId) mainOrder.UserId = UserId;

        return await mainOrder.save();
    },

    async getRecentOrders() {
        return await MainOrder.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
        });
    }
};
