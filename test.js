const { generateLeftQRCode, generateRightQRCode } = require("./script/utils/generateInvoiceData")

const items = [
    { name: "乾電池", quantity: 1, price: 105 },
    { name: "口罩", quantity: 1, price: 210 },
    { name: "牛奶", quantity: 1, price: 25 }
];

console.log("Left QR Code String:", generateLeftQRCode(items));
console.log("Right QR Code String:", generateRightQRCode(items));
