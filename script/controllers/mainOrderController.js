const { MainOrder, Table } = require('../database/models');
const { generateMainOrderId } = require('../utils');

module.exports = {
    // 建立新的主訂單
    async createMainOrder(req, res) {
        const { TableNumber } = req.body;
        try {
            const table = await Table.findOne({ where: { TableNumber } });
            if (!table) {
                return res.status(404).json({ message: "找不到該桌號" });
            }

            if (table.TablesStatus !== '空桌') {
                return res.status(400).json({ message: "該桌號目前不可用" });
            }

            const mainOrderId = generateMainOrderId();
            const newOrder = await MainOrder.create({
                TableId: TableNumber,
                MainOrderId: mainOrderId,
                OrderStatus: '未結帳', // 初始狀態
            });

            // 更新桌號狀態並關聯當前訂單
            await table.update({
                TablesStatus: '點餐中',
                MainOrderId: mainOrderId
            });

            console.log({
                TableNumber,
                mainOrderId
            });

            res.status(200).json(newOrder);
        } catch (error) {
            console.error("Error in createMainOrder:", error);
            res.status(500).json({ message: "建立主訂單失敗", error });
        }
    },

    // 根據主訂單 ID 查詢主訂單資訊
    async getMainOrderInfo(req, res) {
        const { MainOrderId } = req.body;

        console.log(MainOrderId)

        if (!MainOrderId) {
            return res.status(400).json({ error: 'MainOrderId is required' });
        }
        try {
            const mainOrder = await MainOrder.findOne({ where: { MainOrderId } });

            if (!mainOrder) {
                return res.status(404).json({ error: `MainOrder with ID ${MainOrderId} not found` });
            }

            res.status(200).json(mainOrder);

        } catch (error) {
            console.error("Error in getMainOrderInfo:", error);
            res.status(500).json({ message: "查詢主訂單失敗", error });
        }
    },

    // 更新訂單狀態
    async editMainOrder(req, res) {
        const { MainOrderId, OrderStatus, UserId } = req.body;

        try {
            // 檢查是否提供了 MainOrderId 和 OrderStatus
            if (!MainOrderId || !OrderStatus) {
                return res.status(400).json({ message: 'MainOrderId and OrderStatus are required' });
            }

            // 查找訂單
            const mainOrder = await MainOrder.findOne({ where: { MainOrderId } });
            if (!mainOrder) {
                return res.status(404).json({ message: "找不到該訂單" });
            }

            // 更新訂單狀態
            mainOrder.OrderStatus = OrderStatus;

            // 如果提供了 UserId，則更新
            if (UserId) {
                mainOrder.UserId = UserId;
            }

            // 保存更新後的訂單
            await mainOrder.save();

            // 返回成功回應
            res.status(200).json({ message: "訂單狀態已更新", mainOrder });
        } catch (error) {
            console.error("Error in editOrder:", error);
            next(error); // 使用全局錯誤處理中間件
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
};
