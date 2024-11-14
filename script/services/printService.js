// services/printService.js
const mainOrderRepository = require('../repositories/mainOrderRepository');
const subOrderRepository = require('../repositories/subOrderRepository');
const { printMainOrder, printSubOrder, printInvoice } = require('../printer');

module.exports = {
    async printMainOrder(mainOrderId) {
        // 查詢主訂單資料
        const mainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        if (!mainOrder) throw new Error(`主訂單 ${mainOrderId} 不存在`);

        // 傳給打印方法
        printMainOrder(mainOrder)

        return mainOrder;
    },

    async printSubOrder(subOrderId) {
        // 查詢子訂單資料及餐點
        const subOrder = await subOrderRepository.getSubOrderInfo({ subOrderId });
        if (!subOrder) throw new Error(`子訂單 ${subOrderId} 不存在`);

        // 計算子訂單的總金額
        const subTotal = subOrder.MenuItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // 構建打印數據
        const printsubOrder = {
            ...subOrder,
            MenuItems: subOrder.MenuItems.map(menuItem => ({
                ...menuItem,
                total: menuItem.price * menuItem.quantity
            })),
            subTotal
        };

        // 傳給打印方法
        printSubOrder(printsubOrder)

        return printsubOrder;
    },

    async printInvoice(mainOrderId) {
        // 查詢主訂單及其所有子訂單
        const mainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        if (!mainOrder) throw new Error(`主訂單 ${mainOrderId} 不存在`);

        const subOrders = await subOrderRepository.getSubOrderInfo({ mainOrderId });
        if (!subOrders || subOrders.length === 0) throw new Error(`主訂單 ${mainOrderId} 沒有相關的子訂單`);

        // 將所有子訂單的餐點加總
        let totalAmount = 0;
        const items = [];

        subOrders.forEach(subOrder => {
            subOrder.MenuItems.forEach(item => {
                const itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;

                // 合併相同品項的數量和金額
                const existingItem = items.find(i => i.name === item.menuItemName);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                    existingItem.total += itemTotal;
                } else {
                    items.push({
                        name: item.menuItemName,
                        price: item.price,
                        quantity: item.quantity,
                        total: itemTotal
                    });
                }
            });
        });

        mainOrder.subTotal = totalAmount;
        mainOrder.serviceFee = totalAmount * 0.1;
        mainOrder.total = Math.round(totalAmount * 1.1);

        // 構建打印數據
        const invoiceData = {
            ...mainOrder.toJSON(),
            items,
        };

        // 傳給打印方法
        printInvoice(invoiceData)

        return invoiceData;
    }
};
