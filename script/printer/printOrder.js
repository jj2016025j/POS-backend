// printOrder.js
function printOrder(printer, device, order) {
    device.open(error => {
        if (error) {
            console.error('打印機連接錯誤:', error);
            return;
        }

        printer
            .font('a')
            .align('lt')
            .size(1, 1)
            .text("FangFood 芳鍋")
            .text(`訂單編號: ${order.orderNumber}`)
            .text(`下單日期: ${order.orderDate}`)
            .text('菜單:')
            .size(0, 0)
            .text("名稱  單價 數量 總金額")
            .feed(1);

        order.items.forEach(item => {
            printer.text(`${item.name}  ${item.price}  ${item.quantity}  ${item.totalPrice}`).feed(1);
        });

        printer.feed(2).cut().close();
    });
}

module.exports = printOrder;
