const mainOrderRepository = require('../repositories/mainOrderRepository');
const tableRepository = require('../repositories/tableRepository');
const { initiateLinePayTransaction, confirmLinePayTransaction } = require('../utils');

module.exports = {
    async processCheckout(MainOrderId, method) {
        const mainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        if (!mainOrder) throw new Error(`訂單 ${MainOrderId} 不存在`);

        mainOrder.OrderStatus = "已結帳";
        await mainOrder.save();

        // 清空桌位
        await tableRepository.resetTableByOrder(mainOrder.TableId);
        
        return mainOrder;
    },

    async initiateLinePay(MainOrderId) {
        return await initiateLinePayTransaction(MainOrderId);
    },

    async confirmLinePay(transactionId, MainOrderId) {
        await confirmLinePayTransaction(transactionId, MainOrderId);

        const mainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        if (mainOrder) {
            mainOrder.OrderStatus = "已結帳";
            await mainOrder.save();

            // 清空桌位
            await tableRepository.resetTableByOrder(mainOrder.TableId);
        }
        return mainOrder;
    },

    async cancelCheckout(MainOrderId) {
        const mainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        if (!mainOrder || mainOrder.OrderStatus !== "已結帳") {
            throw new Error(`訂單 ${MainOrderId} 還未結帳`);
        }

        mainOrder.OrderStatus = "未結帳";
        await mainOrder.save();

        // 將桌位狀態設為用餐中
        await tableRepository.updateTableStatus(mainOrder.TableId, "用餐中");

        return mainOrder;
    }
};
