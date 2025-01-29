const InvoiceModules = require('./invoiceModules.js');
    
    function splitItemsForQRCode(items) {
        const leftQRCodeItems = items.slice(0, 1); // 只取第一個品項給左方 QR Code
        const rightQRCodeItems = items.slice(1, 50);   // 剩下的品項給右方 QR Code
        return { leftQRCodeItems, rightQRCodeItems };
    }

module.exports = {

    generateLeftQRCode(invoiceData) {
        const invoiceNumber = InvoiceModules.generateInvoiceNumber();       // 發票字軌號碼 (10 碼)
        const invoiceDate = InvoiceModules.formatInvoiceDate();             // 發票開立日期 (7 碼)
        const randomCode = InvoiceModules.generateRandomCode();             // 隨機碼 (4 碼)
        const salesAmountHex = InvoiceModules.convertToHexAmount(invoiceData.total);         // 銷售額 (8 碼十六進位)
        const totalAmountHex = InvoiceModules.convertTotalAmountToHex(invoiceData.total);    // 總計額 (8 碼十六進位)
        const buyerId = InvoiceModules.formatBuyerId();                     // 買方統一編號 (8 碼)
        const sellerId = InvoiceModules.formatSellerId();                   // 賣方統一編號 (8 碼)
        const encryptedInfo = InvoiceModules.encryptVerificationInfo(invoiceNumber, randomCode);  // 加密驗證資訊 (24 碼)
        const customArea = InvoiceModules.generateCustomUseArea();          // 營業人自行使用區 (10 碼)
        const itemCount = InvoiceModules.getBarcodeItemCount(invoiceData.items.length);             // 二維條碼記載完整品目筆數
        const totalItemCount = InvoiceModules.getTotalItemCount(invoiceData.items.length);          // 該張發票交易品目總筆數
        const encodingParameter = InvoiceModules.getEncodingParameter();    // 中文編碼參數

        const { leftQRCodeItems } = splitItemsForQRCode(invoiceData.items);

        const itemName = InvoiceModules.validateItemName(leftQRCodeItems[0].name);  // 品名
        const quantity = InvoiceModules.getQuantity(leftQRCodeItems[0].quantity);   // 數量
        const price = InvoiceModules.getPrice(leftQRCodeItems[0].price);            // 單價

        // 左方二維條碼字串，僅在「營業人自行使用區」之後開始用「:」分隔
        const leftQRCodeString = [
            invoiceNumber + invoiceDate + randomCode + salesAmountHex + totalAmountHex + buyerId + sellerId + encryptedInfo, // 前半部分無冒號
            customArea,
            itemCount,
            totalItemCount,
            encodingParameter,
            itemName,
            quantity,
            price
        ].join(':') + ":"; // 確保左方二維條碼以 ":" 結尾

        return leftQRCodeString;
    },

    generateRightQRCode(invoiceData) {
        const { rightQRCodeItems } = splitItemsForQRCode(invoiceData.items);
        const startSymbol = "**";
        const content = rightQRCodeItems.map(item =>
            `${item.name}:${item.quantity}:${item.price}`
        ).join(":")

        // 右方二維條碼字串，包含起始符號和品項資訊，僅在 `**` 之後使用「:」分隔
        const rightQRCodeString = startSymbol + content;

        return rightQRCodeString;
    }
}