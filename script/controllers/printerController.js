// controllers/printController.js
const printService = require('../services/printService');

module.exports = {
    async printMainOrder(req, res, next) {
        try {
            const { mainOrderId } = req.body;
            mainOrder = await printService.printMainOrder(mainOrderId);
            res.status(200).json(mainOrder);
        } catch (error) {
            console.error("主訂單打印失敗:", error);
            next(error);
        }
    },

    async printSubOrder(req, res, next) {
        try {
            const { subOrderId } = req.body;
            subOrder = await printService.printSubOrder(subOrderId);
            res.status(200).json(subOrder);
        } catch (error) {
            console.error("子訂單打印失敗:", error);
            next(error);
        }
    },

    async printInvoice(req, res, next) {
        try {
            const { mainOrderId } = req.body;
            invoice = await printService.printInvoice(mainOrderId);
            res.status(200).json(invoice);
        } catch (error) {
            console.error("發票打印失敗:", error);
            next(error);
        }
    },

    async printQRCode(req, res) {
        console.log("Received request to print QR code");

        // 模擬接收到的資料，例如 mainOrderId 和 TableNumber
        const { mainOrderId } = req.body;

        try {
            // 假設這裡是 QR Code 的生成與打印邏輯 (目前用 console.log 模擬)
            const fullUrl = `http://localhost:8080/phoneorder/${mainOrderId}`;
            console.log(`Generated QR Code URL: ${fullUrl}`);

            // 模擬列印
            console.log(`Printing QR code for Table ${mainOrderId} with URL: ${fullUrl}`);

            // 回應成功訊息
            res.status(200).json({ qrCodeUrl: fullUrl });
        } catch (error) {
            console.error("Failed to print QR Code:", error);
            res.status(500).json({ message: "Failed to print QR Code" });
        }
    }

};
