// printOrder.js
function printOrder(printer, device, order) {
    const title = "FangFood 芳鍋";
    const menuHeader = "名稱  單價 數量 總金額";

    device.open(error => {
        if (error) {
            console.error('無法連接到打印機:', error);
            return;
        }

        printer
            .font('a')
            .align('lt')
            .size(1, 1)
            .text(title)
            .text(`訂單編號: ${order.orderNumber}`)
            .text(`下單日期: ${order.orderDate}`)
            .text('菜單:')
            .size(0, 0)
            .text(menuHeader)
            .feed(1);

        // 選擇一
        order.items.forEach(item => {
            printer.text(`${item.name}  ${item.price}  ${item.quantity}  ${item.totalPrice}`).feed(1);
        });

        // 選擇二
        order.items.forEach(item => {
            const itemText = `${item.name.padEnd(10)} ${item.price.toFixed(2).padStart(6)}  ${String(item.quantity).padStart(3)}  ${item.totalPrice.toFixed(2).padStart(8)}`;
            printer.text(itemText).feed(1);
        });

        printer.feed(2).cut().close();
    });
}

module.exports = printOrder;
