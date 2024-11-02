// controllers/orderController.js

module.exports = {
    async printQRCode(req, res) {
        console.log("Received request to print QR code");

        // 模擬接收到的資料，例如 MainOrderId 和 TableNumber
        const { MainOrderId, TableNumber } = req.body;
        console.log(`MainOrderId: ${MainOrderId}, TableNumber: ${TableNumber}`);

        try {
            // 假設這裡是 QR Code 的生成與打印邏輯 (目前用 console.log 模擬)
            const fullUrl = `http://localhost:8080/phoneorder/${MainOrderId}`;
            console.log(`Generated QR Code URL: ${fullUrl}`);

            // 模擬列印
            console.log(`Printing QR code for Table ${TableNumber} with URL: ${fullUrl}`);

            // 回應成功訊息
            res.status(200).json({ message: "QR Code printed successfully", qrCodeUrl: fullUrl });
        } catch (error) {
            console.error("Failed to print QR Code:", error);
            res.status(500).json({ message: "Failed to print QR Code" });
        }
    }
}