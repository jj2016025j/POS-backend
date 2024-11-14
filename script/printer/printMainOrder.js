// printMainOrder.js
const qr = require('qr-image');
const { connectAndPrint } = require('./printer');
const { getLocalIPAddress } = require('../utils');
const LocalIP = getLocalIPAddress();

function printMainOrder(
    mainOrder,
    url = `http://${LocalIP}:3000/pos`,
) {
    const qrContent = url;
    const qrCode = qr.imageSync(qrContent, { type: 'png', size: 5 });

    connectAndPrint((printer) => {
        printer
            .font('a')
            .align('lt')
            .size(1, 1)
            .text('Fang Food 芳鍋')
            .text(`桌號: ${mainOrder.TableId}`)
            .text(`訂單編號: ${mainOrder.mainOrderId}`)
            // .qrimage(qrContent, { type: 'png', size: 5 }, function () {
            //     contents.forEach(content => this.text(content));
            //     this.feed(2).cut().close();
            // });
    });
}

module.exports = printMainOrder;
