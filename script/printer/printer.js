// printer.js
const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const fakePrinter = {
    open: () => console.log("Fake printer opened"),
    print: (content) => console.log(`Fake print: ${content}`),
    close: () => console.log("Fake printer closed"),
  };

const device = process.env.PRINTER_TEST ? fakePrinter : new escpos.USB();
const options = { encoding: "Big5", width: 42 };
const printer = new escpos.Printer(device, options);

const printContent = (content) => {
  printer.open(() => {
    printer.print(content);
    printer.close();
  });
};

module.exports = { printer, device };
