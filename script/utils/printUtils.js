// utils/printUtils.js
const { somePrinterLibrary } = require('some-printer-library');  // 假設打印機庫

exports.printOrderWithQR = async (url, mainOrderId, tableNumber) => {
    // 使用打印機庫來生成並打印QR Code
    try {
        await somePrinterLibrary.printQRCode(url, mainOrderId, tableNumber);
    } catch (error) {
        throw new Error("打印失敗: " + error.message);
    }
};

exports.printOrder = async (orderData) => {
    try {
        await somePrinterLibrary.print(orderData);
    } catch (error) {
        throw new Error("打印失敗: " + error.message);
    }
};
