// services/paymentService.js
const pool = require('../database/operations');
const { initiateLinePayTransaction, confirmLinePayTransaction } = require('../utils/linePayUtils');

exports.processCashOrder = async (orderId) => {
    const invoiceData = await pool.processCashOrder(orderId);
    return { invoiceData };
};

exports.initiatePayment = async (id) => {
    const paymentUrl = await initiateLinePayTransaction(id);
    return paymentUrl;
};

exports.confirmPayment = async (transactionId, orderId) => {
    await confirmLinePayTransaction(transactionId, orderId);
};

exports.confirmPaymentByCash = async (orderId) => {
    return pool.confirmPaymentByCash(orderId);
};

exports.checkoutMainOrder = async (mainOrderId) => {
    const mainOrderInfo = await pool.getMainOrderInfoById(mainOrderId);
    if (!mainOrderInfo) {
        throw new Error(`Order ${mainOrderId} does not exist`);
    }

    if (mainOrderInfo.OrderStatus === "已結帳") {
        await pool.editTableInfo(mainOrderInfo.TableId, "清潔中", "");
        return { message: `訂單 ${mainOrderId} 已結帳`, mainOrderInfo };
    }

    const tableId = await pool.getTableIdByMainOrderId(mainOrderId);
    await pool.editTableInfo(tableId, "清潔中", "");
    await pool.editMainOrderStatus(mainOrderId, "已結帳");

    return { message: `訂單 ${mainOrderId} 已完成結帳` };
};

exports.cancelCheckout = async (mainOrderId) => {
    const mainOrderInfo = await pool.getMainOrderInfoById(mainOrderId);
    if (!mainOrderInfo || mainOrderInfo.OrderStatus !== "已結帳") {
        return { message: `此訂單 ${mainOrderId} 還未結帳！` };
    }

    await pool.editMainOrderStatus(mainOrderId, "未結帳");
    return {
        message: `訂單 ${mainOrderId} 已修改為未結帳`,
        mainOrderInfo: await pool.getMainOrderInfoById(mainOrderId),
    };
};
