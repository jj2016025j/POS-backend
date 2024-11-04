// utils/printUtils.js
// const somePrinterLibrary = require('some-printer-library');  // 假設打印機庫

async function printOrderWithQR(url, mainOrderId, tableNumber) {
    try {
        // await somePrinterLibrary.printQRCode(url, mainOrderId, tableNumber);
    } catch (error) {
        console.error("打印失敗: ", error.message);
        throw new Error("打印失敗: " + error.message);
    }
}

async function printOrder(orderData) {
    try {
        await somePrinterLibrary.print(orderData);
    } catch (error) {
        console.error("打印失敗: ", error.message);
        throw new Error("打印失敗: " + error.message);
    }
}

module.exports = { printOrderWithQR, printOrder };
