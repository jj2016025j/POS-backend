const { MainOrder, Table } = require('../database/models');
const { generateOrderId } = require('../utils');

module.exports = {
    // 建立新的主訂單
    async createMainOrder(req, res) {
        const { tableNumber } = req.body;
        try {
            const mainOrderId = generateOrderId();
            const newOrder = await MainOrder.create({
                TableId: tableNumber,
                MainOrderId: mainOrderId,
                OrderStatus: '未結帳', // 初始狀態
            });
            console.log({
                tableNumber: tableNumber,
                mainOrderId: mainOrderId
            });
            res.status(200).json(newOrder);
        } catch (error) {
            console.error("Error in createMainOrder:", error);
            res.status(500).json({ message: "建立主訂單失敗", error });
        }
    },

    // 更新訂單狀態
    async editMainOrder(req, res) {
        const { orderId, status } = req.body;
        try {
            const order = await MainOrder.findByPk(orderId);
            if (order) {
                order.OrderStatus = status;
                await order.save();
                res.status(200).json({ message: "訂單狀態已更新", order });
            } else {
                res.status(404).json({ message: "找不到該訂單" });
            }
        } catch (error) {
            console.error("Error in editOrder:", error);
            res.status(500).json({ message: "更新訂單狀態失敗", error });
        }
    },

    // 根據主訂單 ID 查詢主訂單資訊
    async getMainOrderInfo(req, res) {
        const { mainOrderId } = req.params;
        try {
            const order = await MainOrder.findOne({ where: { id: mainOrderId } });
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: "找不到該主訂單" });
            }
        } catch (error) {
            console.error("Error in getMainOrderInfo:", error);
            res.status(500).json({ message: "查詢主訂單失敗", error });
        }
    },

    // 取得最近的訂單
    async getRecentOrders(req, res) {
        try {
            const recentOrders = await MainOrder.findAll({
                order: [['createdAt', 'DESC']],
                limit: 10, // 假設取得最近 10 筆訂單
            });
            res.status(200).json(recentOrders);
        } catch (error) {
            console.error("Error in getRecentOrders:", error);
            res.status(500).json({ message: "取得最近訂單失敗", error });
        }
    },

    // 建立新訂單（驗證桌位狀態）
    async createNewOrder(req, res) {
        const { TableNumber } = req.body;
        try {
            const existingTable = await Table.findOne({ where: { TableNumber } });
            if (existingTable && existingTable.TablesStatus !== "空桌") {
                return res.status(400).json({ message: "此桌目前已有訂單" });
            }

            const newOrder = await MainOrder.create({ TableNumber });
            await Table.update(
                { TablesStatus: "點餐中", MainOrderId: newOrder.id },
                { where: { TableNumber } }
            );

            res.status(200).json(newOrder);
        } catch (error) {
            console.error("Error in createNewOrder:", error);
            res.status(500).json({ message: "建立新訂單失敗", error });
        }
    },

    // 取得所有桌位狀態
    async getAllTableStatus(req, res) {
        try {
            const tableStatus = await Table.findAll();
            res.status(200).json(tableStatus);
        } catch (error) {
            console.error("Error in getAllTableStatus:", error);
            res.status(500).json({ message: "取得所有桌號狀態失敗", error });
        }
    }
};
