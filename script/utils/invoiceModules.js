const crypto = require('crypto');

module.exports = InvoiceModules = {
    // 發票字軌號碼 (Invoice Number)
    generateInvoiceNumber(invoiceNumber = null) {
        if (!invoiceNumber) {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const digits = '0123456789';
            invoiceNumber = chars.charAt(Math.floor(Math.random() * chars.length)) +
                chars.charAt(Math.floor(Math.random() * chars.length)) +
                Array.from({ length: 8 }, () => digits.charAt(Math.floor(Math.random() * digits.length))).join('');
        }
        if (invoiceNumber.length !== 10) throw new Error("發票字軌號碼必須是 10 碼");
        return invoiceNumber;
    },

    // 發票開立日期 (Invoice Date)
    formatInvoiceDate(year = new Date().getFullYear() - 1911, month = new Date().getMonth() + 1, day = new Date().getDate()) {
        const formattedDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
        if (formattedDate.length !== 7) throw new Error("日期格式不正確，必須為 7 碼");
        return formattedDate;
    },

    // 隨機碼 (Random Code)
    generateRandomCode(code = null) {
        if (!code) {
            code = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
        }
        if (code.length !== 4) throw new Error("隨機碼必須是 4 碼");
        return code;
    },

    // 銷售額 (Sales Amount) 未稅
    convertToHexAmount(amount = 0) {
        let hexAmount = parseInt(amount, 10).toString(16).toUpperCase();
        return hexAmount.padStart(8, '0');
    },

    // 總計額 (Total Amount) 含稅
    convertTotalAmountToHex(amount = 0) {
        let hexTotal = parseInt(amount, 10).toString(16).toUpperCase();
        return hexTotal.padStart(8, '0');
    },

    // 買方統一編號 (Buyer ID)
    formatBuyerId(buyerId = '00000000') {
        return buyerId.padStart(8, '0');
    },

    // 賣方統一編號 (Seller ID)
    formatSellerId(sellerId = '08765432') {
        return sellerId.padStart(8, '0');
    },

    // 加密驗證資訊 (Encrypted Verification Information)
    encryptVerificationInfo(invoiceNumber, randomCode, secretKey = 'dummySecretKey_dummySecretKey1234') {
        if (!invoiceNumber || !randomCode || invoiceNumber.length !== 10 || randomCode.length !== 4) {
            throw new Error("發票字軌號碼必須是 10 碼，隨機碼必須是 4 碼");
        }
    
        // 將發票字軌號碼和隨機碼合併成字串
        const combinedString = `${invoiceNumber}${randomCode}`;
    
        // 確保 secretKey 長度為 32 字節
        const key = Buffer.from(secretKey.padEnd(32).slice(0, 32), 'utf-8');
        const iv = Buffer.alloc(16, 0); // 初始化向量（IV），若無特別要求，可填充 0
    
        // 建立加密器
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    
        // 加密並轉換為 Base64
        let encrypted = cipher.update(combinedString, 'utf8', 'base64');
        encrypted += cipher.final('base64');
    
        return encrypted;
    },

    // 營業人自行使用區 (Custom Use Area)
    generateCustomUseArea(info = "**********") {
        return info;
    },

    // 二維條碼記載完整品目筆數 (Item Count in Barcode)
    getBarcodeItemCount(itemCount = 0) {
        return itemCount.toString();
    },

    // 該張發票交易品目總筆數 (Total Item Count)
    getTotalItemCount(totalItems = 0) {
        return totalItems.toString();
    },

    // 中文編碼參數 (Encoding Parameter)
    getEncodingParameter(encodingType = 'UTF-8') {
        switch (encodingType) {
            case 'Big5': return '0';
            case 'UTF-8': return '1';
            case 'Base64': return '2';
            default: throw new Error("不支持的編碼格式");
        }
    },

    // 品名 (Item Name)
    validateItemName(name = "未命名商品") {
        if (name.includes(":")) throw new Error("品名不能包含冒號");
        return name;
    },

    // 數量 (Quantity)
    getQuantity(quantity = 1) {
        return quantity.toString();
    },

    // 單價 (Price)
    getPrice(price = 0) {
        return price.toString();
    },

    // 補充說明 (Additional Information)
    addAdditionalInfo(info = "") {
        return info;
    },
};
