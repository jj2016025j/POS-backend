const { MainOrder, Table } = require('../database/models');
const { initiateLinePayTransaction, confirmLinePayTransaction } = require('../utils');

module.exports = {
    // 現金結帳處理並生成發票
    async cashCheckout(req, res) {
        try {
            const { MainOrderId } = req.body;
            const mainOrder = await MainOrder.findByPk(MainOrderId);
            if (!mainOrder) {
                return res.status(404).json({ error: `訂單 ${MainOrderId} 不存在` });
            }
            mainOrder.OrderStatus = "已結帳";
            await mainOrder.save();
            res.status(200).json(mainOrder);
        } catch (error) {
            console.error("現金結帳失敗:", error);
            res.status(500).json({ error: '現金結帳處理失敗' });
        }
    },

    // 信用卡結帳處理
    async creditCardCheckout(req, res) {
        try {
            const { MainOrderId } = req.body;
            const mainOrder = await MainOrder.findByPk(MainOrderId);
            if (!mainOrder) {
                return res.status(404).json({ error: `訂單 ${MainOrderId} 不存在` });
            }
            mainOrder.OrderStatus = "已結帳";
            await mainOrder.save();
            res.status(200).json(mainOrder);
        } catch (error) {
            console.error("信用卡結帳失敗:", error);
            res.status(500).json({ error: '信用卡結帳處理失敗' });
        }
    },

    // 發起 Line Pay 支付
    async initiateLinePay(req, res) {
        try {
            const { MainOrderId } = req.body;
            const paymentUrl = await initiateLinePayTransaction(MainOrderId);
            res.status(200).json(paymentUrl);
        } catch (error) {
            console.error("發起 Line Pay 支付失敗:", error);
            res.status(500).json({ error: '伺服器錯誤，無法發起 Line Pay 支付' });
        }
    },

    // 確認 Line Pay 支付
    async confirmLinePay(req, res) {
        try {
            const { transactionId, MainOrderId } = req.body; // 從請求體中獲取參數
            await confirmLinePayTransaction(transactionId, MainOrderId);

            const mainOrder = await MainOrder.findByPk(MainOrderId);
            if (mainOrder) {
                mainOrder.OrderStatus = "已結帳";
                await mainOrder.save();
            }
            res.status(200).json(mainOrder);
        } catch (error) {
            console.error("確認 Line Pay 支付失敗:", error);
            res.status(500).json({ error: '無法確認 Line Pay 支付' });
        }
    },

    // 取消結帳
    async cancelCheckout(req, res) {
        try {
            const { MainOrderId } = req.body;
            const mainOrder = await MainOrder.findByPk(MainOrderId);
            if (!mainOrder || mainOrder.OrderStatus !== "已結帳") {
                return res.status(400).json({ message: `訂單 ${MainOrderId} 還未結帳` });
            }
            mainOrder.OrderStatus = "未結帳";
            await mainOrder.save();
            res.status(200).json(mainOrder);
        } catch (error) {
            console.error("取消結帳失敗:", error);
            res.status(500).json({ error: '無法取消結帳' });
        }
    },
};
