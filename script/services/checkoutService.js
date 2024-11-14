const mainOrderRepository = require('../repositories/mainOrderRepository');
const tableRepository = require('../repositories/tableRepository');
const { requestLinePay } = require('./linePayService');
const { confirmLinePayTransaction } = require('../utils');

module.exports = {
    async processCheckout(mainOrderId) {

        const mainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        if (!mainOrder) throw new Error(`訂單 ${mainOrderId} 不存在`);

        mainOrder.orderStatus = "已結帳";
        await mainOrder.save();

        // 清空桌位
        await tableRepository.resetTableByOrder(mainOrder.tableNumber);

        return mainOrder;
    },

    async creditCardCheckout(mainOrderId) {

        const mainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        if (!mainOrder) throw new Error(`訂單 ${mainOrderId} 不存在`);

        // 發送交易請求給信用卡機
        const transactionResult = await creditCardService.processTransaction(mainOrder.totalAmount);

        if (transactionResult.status !== 'success') {
            throw new Error(`信用卡交易失敗: ${transactionResult.errorMessage}`);
        }

        mainOrder.orderStatus = "已結帳";
        await mainOrder.save();

        // 清空桌位
        await tableRepository.resetTableByOrder(mainOrder.tableNumber);

        return mainOrder;
    },

    async cancelTransaction(mainOrderId) {
        // 模擬建立連接
        const connection = await establishConnection();
        if (!connection) {
            return { status: 'failure', errorMessage: '無法連接到信用卡機' };
        }

        // 發送取消請求
        const cancelResponse = await connection.sendCancelRequest(mainOrderId);
        if (!cancelResponse.success) {
            return { status: 'failure', errorMessage: cancelResponse.error };
        }

        return { status: 'success' };
    },

    async requestLinePay(oneTimeKey, mainOrderId) {
        const mainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        return await requestLinePay(oneTimeKey, mainOrder);
    },

    async confirmLinePay(mainOrderId) {
        // 確認支付
        const mainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        const confirmationResult = await linePayService.confirmPayment(mainOrder);

        if (!confirmationResult)
            return null
        
        const newMainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        if (newMainOrder) {
            newMainOrder.orderStatus = "已結帳";
            await newMainOrder.save();

            // 清空桌位
            await tableRepository.resetTableByOrder(newMainOrder.tableNumber);
        }
        return newMainOrder;
    },

    async cancelCheckout(mainOrderId) {
        const mainOrder = await mainOrderRepository.findMainOrderById(mainOrderId);
        if (!mainOrder || mainOrder.orderStatus !== "已結帳") {
            throw new Error(`訂單 ${mainOrderId} 還未結帳`);
        }

        let cancelSuccess = false;

        try {
            if (mainOrder.paymentMethod === 'Line pay') {
                await refundLinePay(mainOrder.mainOrderId, mainOrder.total); // 100 是退款金額
                cancelSuccess = true;
            } else if (mainOrder.paymentMethod === '信用卡') {
                await creditCardService.cancelTransaction(mainOrder.transactionId);
                cancelSuccess = true;
            } else if (mainOrder.paymentMethod === '現金') {
                cancelSuccess = true;
            }

            if (cancelSuccess) {
                // 更新訂單狀態
                mainOrder.orderStatus = "未結帳";
                await mainOrder.save();

                // 更新桌位狀態
                await tableRepository.updateTableStatus(mainOrder.tableNumber, "用餐中");
            }
            else{
                throw new Error(`取消訂單失敗: ${error.message}`);
            }

            return mainOrder;
        } catch (error) {
            console.error(`取消訂單 ${mainOrderId} 失敗:`, error);
            throw new Error(`取消訂單失敗: ${error.message}`);
        }
    }
};
