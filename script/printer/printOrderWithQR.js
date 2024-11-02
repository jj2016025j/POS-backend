// printOrderWithQR.js
const escpos = require('escpos');
const qr = require('qr-image');
const { getLocalIPAddress } = require('../utils/getIPAddress');
const LocalIP = getLocalIPAddress();

function printOrderWithQR(printer, device, url = `http://${LocalIP}:3000/pos`, orderNumber = 1, tableNumber = 1, contents = []) {
    const qrContent = `${url}`;
    const qrCode = qr.imageSync(qrContent, { type: 'png', size: 10 });

    device.open(error => {
        if (error) {
            console.error('打印機連接錯誤:', error);
            return;
        }
        printer
            .font('a')
            .align('lt')
            .size(1, 1)
            .text('Fang Food 芳鍋')
            .text(`桌號: ${tableNumber}`)
            .text(`訂單編號: ${orderNumber}`)
            .qrimage(qrContent, { type: 'png', size: 5 }, function() {
                contents.forEach(content => this.text(content));
                this.feed(2).cut().close();
            });
    });
}

module.exports = printOrderWithQR;
