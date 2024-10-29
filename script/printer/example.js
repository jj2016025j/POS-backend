// 使用範例
const printerModule = require('./printer/index');
const defaultOrder = {
    orderNumber: 'A123456',
    orderDate: '2024-03-19',
    items: [{ name: '牛肉鍋', price: 500, quantity: 1, totalPrice: 500 }]
};
const defaultInvoice = { 
    header: 'FangFood 芳鍋', 
    dateTime: '2024-03-18 11:22:33',
    invoiceNumber: 'AB-12345678' 
};

// 打印QRCODE
printerModule.printOrderWithQR("https://example.com", "A123456", "10", ["掃碼點餐", "祝用餐愉快"]);

// 打印訂單
printerModule.printOrder(defaultOrder);

// 打印發票
printerModule.printInvoice(defaultInvoice);