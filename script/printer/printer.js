// printer.js
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const device = new escpos.USB();
const options = { encoding: "Big5", width: 42 };
const printer = new escpos.Printer(device, options);

module.exports = { printer, device };
