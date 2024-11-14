const { sendLinePayRequest } = require("../request/linePayRequest");

/**
 * 發起支付請求 掃描店家版本
 * @param {object} order - 訂單信息
 * @returns {string} - 用戶支付頁面的 URL
 */
async function initiatePayment(order) {
    const uri = "/v2/payments/request";
    const body = {
        productName:order.mainOrderId,
        amount: order.total,
        currency: "TWD",
        confirmUrl: linePayConfig.confirmUrl,
        redirectUrls: {
            cancelUrl: linePayConfig.cancelUrl,
        },
    };
    const data = await sendLinePayRequest(uri, body);
    return data.info.paymentUrl.web;
}

/**
 * 確認支付請求 掃描店家版本
 * @param {string} transactionId - 交易 ID
 * @param {number} amount - 訂單金額
 * @returns {object} - 支付確認結果
 */
async function confirmPayment(transactionId, amount) {
    const uri = `/v2/payments/${transactionId}/confirm`;
    const body = { amount, currency: "TWD" };
    return await sendLinePayRequest(uri, body);
}

/**
* 發起付款請求（使用 oneTimeKey）掃描客人版本
* @param {string} oneTimeKey - 一次性密鑰
* @param {object} mainOrder - 包含付款相關的信息，如 productName、amount、currency、orderId、extras 等
* @returns {object} - 付款結果
*/
async function requestLinePay(oneTimeKey, mainOrder) {
    const uri = "/v2/payments/oneTimeKeys/pay";
    const body = {
      productName: mainOrder.mainOrderId,
      amount: mainOrder.total,
      currency: "TWD",
      orderId: mainOrder.mainOrderId,
      oneTimeKey: oneTimeKey,
      extras: mainOrder.extras,
    };
    const data = await sendLinePayRequest(uri, body);
    return data;
}

/**
 * 確認支付請求 掃描客人版本
 * @param {string} transactionId - 交易 ID
 * @param {number} amount - 訂單金額
 * @returns {object} - 支付確認結果
 */
async function confirmPayment(transactionId, amount) {
    const uri = `/payments/${transactionId}/confirm`;
    const body = { amount, currency: "TWD" };
    return await sendLinePayRequest(uri, body);
}

/**
 * 退款請求 掃描客人版本
 * @param {string} orderId - 訂單 ID
 * @param {number} refundAmount - 退款金額
 * @returns {object} - 退款結果
 */
async function refundLinePay(orderId, refundAmount) {
    const uri = `/v2/payments/orders/${orderId}/refund`;
    const body = { refundAmount };
    const data = await sendLinePayRequest(uri, body);
    return data;
}

module.exports = {
    requestLinePay,
    initiatePayment,
    confirmPayment,
    refundLinePay,
};