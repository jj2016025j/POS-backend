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

const connectAndPrint = (printCallback) => {
  device.open((error) => {
    if (error) {
      console.error('無法連接到打印機:', error);
      return;
    }
    printCallback(printer);
    printer.close();
  });
};

module.exports = { connectAndPrint };
