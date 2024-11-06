// controllers/kitchenController.js
const orderService = require('../services/orderService');

module.exports = {
    async getPendingOrders(req, res) {
        try {
            const orders = await orderService.getPendingOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: '取得待處理訂單失敗', error });
        }
    },
    async updateOrderStatus(req, res) {
        try {
            const { orderId, status } = req.body;
            const updatedOrder = await orderService.updateOrderStatus(orderId, status);

            // 通知 WebSocket 客戶端（廚房系統）狀態更新
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ message: "訂單狀態已更新", orderId, status }));
                }
            });

            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ message: '更新訂單狀態失敗', error });
        }
    },
};

