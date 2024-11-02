// services/orderService.js
const { MainOrder, Table } = require('../models');

module.exports = {
    // 建立新的主訂單
    async createMainOrder(tableNumber) {
        return await MainOrder.create({
            TableId: tableNumber,
            OrderStatus: '未結帳', // 初始狀態
        });
    },

    // 更新訂單狀態
    async editOrder(orderId, status) {
        const order = await MainOrder.findByPk(orderId);
        if (order) {
            order.OrderStatus = status;
            await order.save();
        }
        return order;
    },

    // 根據主訂單 ID 查詢主訂單資訊
    async getMainOrderInfo(mainOrderId) {
        return await MainOrder.findOne({ where: { id: mainOrderId } });
    },

    // 取得最近的訂單
    async getRecentOrders() {
        return await MainOrder.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10, // 假設取得最近 10 筆訂單
        });
    },

    // 建立新訂單
    async createNewOrder(req, res) {
        const { TableNumber } = req.body;
        try {
            const existingTable = await Table.findOne({ where: { TableNumber } });
            if (existingTable && existingTable.TablesStatus !== "空桌") {
                return res.status(500).json({ message: "此桌目前已有訂單" });
            }

            const order = await MainOrder.create({ TableNumber });
            await Table.update(
                { TablesStatus: "點餐中", MainOrderId: order.id },
                { where: { TableNumber } }
            );

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: "Failed to create new order" });
        }
    },

    // 取得所有桌位狀態
    async getAllTableStatus(req, res) {
        try {
            const tableStatus = await Table.findAll();
            res.json(tableStatus);
        } catch (error) {
            res.status(500).json({ message: "取得所有桌號狀態失敗" });
        }
    }
};
