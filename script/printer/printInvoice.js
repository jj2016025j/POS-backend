// printInvoice.js
async function printInvoice(printer, device, invoiceData) {
    device.open(async function (error) {
        if (error) {
            console.error('打印機連接錯誤:', error);
            return;
        }

        printer
            .font('a')
            .align('lt')
            .size(1, 1)
            .text(invoiceData.header)
            .text(`電子發票證明聯`)
            .text(`發票編號: ${invoiceData.invoiceNumber}`)
            .text(`開票日期: ${invoiceData.dateTime}`)
            .feed(2)
            .cut()
            .close();
    });
}

module.exports = printInvoice;
