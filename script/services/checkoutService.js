const mainOrderRepository = require('../repositories/mainOrderRepository');
const tableRepository = require('../repositories/tableRepository');
const { initiateLinePayTransaction, confirmLinePayTransaction } = require('../utils');

module.exports = {
    async processCheckout(MainOrderId) {
        
        const mainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        if (!mainOrder) throw new Error(`訂單 ${MainOrderId} 不存在`);

        mainOrder.OrderStatus = "已結帳";
        await mainOrder.save();

        // 清空桌位
        await tableRepository.resetTableByOrder(mainOrder.TableId);

        return mainOrder;
    },

    async creditCardCheckout(MainOrderId) {

        const mainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        if (!mainOrder) throw new Error(`訂單 ${MainOrderId} 不存在`);

        // 發送交易請求給信用卡機
        const transactionResult = await creditCardService.processTransaction(mainOrder.totalAmount);

        if (transactionResult.status !== 'success') {
            throw new Error(`信用卡交易失敗: ${transactionResult.errorMessage}`);
        }

        mainOrder.OrderStatus = "已結帳";
        await mainOrder.save();

        // 清空桌位
        await tableRepository.resetTableByOrder(mainOrder.TableId);

        return mainOrder;
    },

    async cancelTransaction(MainOrderId) {
        // 模擬建立連接
        const connection = await establishConnection();
        if (!connection) {
            return { status: 'failure', errorMessage: '無法連接到信用卡機' };
        }

        // 發送取消請求
        const cancelResponse = await connection.sendCancelRequest(MainOrderId);
        if (!cancelResponse.success) {
            return { status: 'failure', errorMessage: cancelResponse.error };
        }

        return { status: 'success' };
    },

    async initiateLinePay(MainOrderId) {
        const mainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        return await initiateLinePayTransaction(mainOrder);
    },

    async confirmLinePay(MainOrderId) {
        // 確認支付
        const mainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        const confirmationResult = await linePayService.confirmPayment(mainOrder);

        await confirmLinePayTransaction(MainOrderId);

        const newMainOrder = await mainOrderRepository.findMainOrderById(MainOrderId);
        if (newMainOrder) {
            newMainOrder.OrderStatus = "已結帳";
            await newMainOrder.save();

            // 清空桌位
            await tableRepository.resetTableByOrder(newMainOrder.TableId);
        }
        return newMainOrder;
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
