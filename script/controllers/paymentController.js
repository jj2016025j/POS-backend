const { MainOrder, Table, Order } = require('../database/models');
const { initiateLinePayTransaction, confirmLinePayTransaction } = require('../utils/linePayUtils');

module.exports = {
    // 現金結帳處理並生成發票
    async cashCheckout(req, res) {
        try {
            const orderId = req.body.orderId;
            const mainOrder = await MainOrder.findByPk(orderId);
            if (!mainOrder) {
                return res.status(404).json({ error: `Order ${orderId} does not exist` });
            }
            mainOrder.OrderStatus = "已結帳";
            await mainOrder.save();
            res.status(200).json({ invoiceData: mainOrder });
        } catch (error) {
            res.status(500).json({ error: 'Failed to process cash order' });
        }
    },

    // 信用卡結帳處理
    async creditCardCheckout(req, res) {
        try {
            const orderId = req.body.orderId;
            const mainOrder = await MainOrder.findByPk(orderId);
            if (!mainOrder) {
                return res.status(404).json({ error: `Order ${orderId} does not exist` });
            }
            mainOrder.OrderStatus = "已結帳";
            await mainOrder.save();
            res.status(200).json({ message: 'Credit card payment successful', mainOrder });
        } catch (error) {
            res.status(500).json({ error: 'Failed to process credit card payment' });
        }
    },

    // 發起 Line Pay 支付
    async initiateLinePay(req, res) {
        try {
            const id = req.body.orderId;
            const paymentUrl = await initiateLinePayTransaction(id);
            res.json({ paymentUrl });
        } catch (error) {
            res.status(500).send('Server Error');
        }
    },

    // 確認 Line Pay 支付
    async confirmLinePay(req, res) {
        try {
            const { transactionId, orderId } = req.query;
            await confirmLinePayTransaction(transactionId, orderId);
            const order = await MainOrder.findByPk(orderId);
            if (order) {
                order.OrderStatus = "已結帳";
                await order.save();
            }
            res.status(200).json({ message: 'Line Pay payment confirmed', order });
        } catch (error) {
            res.status(500).json({ error: 'Failed to confirm Line Pay payment' });
        }
    },

    // 取消結帳
    async cancelCheckout(req, res) {
        try {
            const mainOrderId = req.body.orderId;
            const mainOrder = await MainOrder.findByPk(mainOrderId);
            if (!mainOrder || mainOrder.OrderStatus !== "已結帳") {
                return res.status(400).json({ message: `此訂單 ${mainOrderId} 還未結帳！` });
            }
            mainOrder.OrderStatus = "未結帳";
            await mainOrder.save();
            res.status(200).json({ message: `訂單 ${mainOrderId} 已修改為未結帳`, mainOrder });
        } catch (error) {
            res.status(500).json({ error: 'Failed to cancel checkout' });
        }
    },
};
