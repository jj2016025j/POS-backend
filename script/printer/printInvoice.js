// printInvoice.js
const { connectAndPrint } = require('./printer');
const { generateLeftQRCode, generateRightQRCode } = require("../utils/generateInvoiceData")

function printInvoice(invoiceData) {
    generateLeftQRCode(invoiceData)
    generateRightQRCode(invoiceData)
    connectAndPrint((printer) => {
        printer
            .font('a')
            .align('lt')
            .size(1, 1)
            .text("FangFood 芳鍋")
            .text('電子發票證明聯')
            .text(`發票編號: ${invoiceData.invoiceNumber}`)
            .text(`開票日期: ${invoiceData.dateTime}`)
            .feed(2)
            .cut();
    });
}

module.exports = printInvoice;
