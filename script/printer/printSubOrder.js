// printSubOrder.js
const { connectAndPrint } = require('./printer');

function formatDate(isoDate) {
  return isoDate.replace('T', ' ').substring(0, 19).replace(/-/g, '.');
}

function printSubOrder(subOrder) {
    connectAndPrint((printer) => {
      const title = "FangFood 芳鍋";
      const menuHeader = "名稱  單價 數量 總金額";
      const formattedDate = formatDate(subOrder.createTime);

        printer
            .font('a')
            .align('lt')
            .size(1, 1)
            .text(title)
            .text(`訂單編號: ${subOrder.subOrderId}`)
            .text(`下單日期: ${formattedDate}`)
            .text('菜單:')
            .size(0, 0)
            .text(menuHeader)
            .feed(1);

        // 選擇一
        subOrder.items.forEach(item => {
            printer.text(`${item.name}  ${item.price}  ${item.quantity}  ${item.totalPrice}`).feed(1);
        });

        // 選擇二
        subOrder.items.forEach(item => {
            const itemText = `${item.name.padEnd(10)} ${item.price.toFixed(2).padStart(6)}  ${String(item.quantity).padStart(3)}  ${item.totalPrice.toFixed(2).padStart(8)}`;
            printer.text(itemText).feed(1);
        });

        printer.feed(2).cut().close();
    });
}

module.exports = printSubOrder;
