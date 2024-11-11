// index.js
const { printer, device } = require('./printer');
const printMainOrder = require('./printMainOrder');
const printSubOrder = require('./printSubOrder');
const printInvoice = require('./printInvoice');

module.exports = {
    printMainOrder: (mainOrder) => {
        printMainOrder(printer, device, mainOrder, url, orderNumber, tableNumber, contents)
    },
    printSubOrder: (subOrder) => {
        printSubOrder(printer, device, subOrder)
    },
    printInvoice: (invoiceData) => {
        printInvoice(printer, device, invoiceData)

    },
};
