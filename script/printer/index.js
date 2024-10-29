// index.js
const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const printOrderWithQR = require('./printOrderWithQR');
const printOrder = require('./printOrder');
const printInvoice = require('./printInvoice');

let device = new escpos.USB();
let options = { encoding: "Big5", width: 42 };
let printer = new escpos.Printer(device, options);

module.exports = {
    printOrderWithQR: (url, orderNumber, tableNumber, contents) => printOrderWithQR(printer, device, url, orderNumber, tableNumber, contents),
    printOrder: (order) => printOrder(printer, device, order),
    printInvoice: (invoiceData) => printInvoice(printer, device, invoiceData)
};
