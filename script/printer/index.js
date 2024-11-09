// index.js
const { printer, device } = require('./printer');
const printMainOrder = require('./printMainOrder');
const printOrder = require('./printOrder');
const printInvoice = require('./printInvoice');

module.exports = {
    printMainOrder: (url, orderNumber, tableNumber, contents) => {
        printMainOrder(printer, device, url, orderNumber, tableNumber, contents)
    },
    printOrder: (order) => {
        printOrder(printer, device, order)
    },
    printInvoice: (invoiceData) => {
        printInvoice(printer, device, invoiceData)

    },
};
