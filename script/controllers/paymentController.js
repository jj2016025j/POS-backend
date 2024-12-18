const checkoutService = require('../services/checkoutService');

module.exports = {
    async cashCheckout(req, res) {
        try {
            const result = await checkoutService.processCheckout(req.body.mainOrderId);
            res.status(200).json(result);
        } catch (error) {
            console.error("現金結帳失敗:", error);
            res.status(500).json({ error: '現金結帳處理失敗' });
        }
    },

    async creditCardCheckout(req, res) {
        try {
            const result = await checkoutService.creditCardCheckout(req.body.mainOrderId);
            res.status(200).json(result);
        } catch (error) {
            console.error("信用卡結帳失敗:", error);
            res.status(500).json({ error: '信用卡結帳處理失敗' });
        }
    },

    async requestLinePay(req, res) {
        try {
            const paymentUrl = await checkoutService.requestLinePay(req.body.oneTimeKey, req.body.mainOrderId);
            res.status(200).json(paymentUrl);
        } catch (error) {
            console.error("發起 Line Pay 支付失敗:", error);
            res.status(500).json({ error: '伺服器錯誤，無法發起 Line Pay 支付' });
        }
    },

    async confirmLinePay(req, res) {
        try {
            const result = await checkoutService.confirmLinePay(req.body.transactionId, req.body.mainOrderId);
            res.status(200).json(result);
        } catch (error) {
            console.error("確認 Line Pay 支付失敗:", error);
            res.status(500).json({ error: '無法確認 Line Pay 支付' });
        }
    },

    async cancelCheckout(req, res) {
        try {
            const result = await checkoutService.cancelCheckout(req.body.mainOrderId);
            res.status(200).json(result);
        } catch (error) {
            console.error("取消結帳失敗:", error);
            res.status(500).json({ error: '無法取消結帳' });
        }
    },
};
