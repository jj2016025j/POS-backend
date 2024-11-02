// utils/linePayService.js
const axios = require("axios");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");
const dotenv = require("dotenv");
dotenv.config();

const {
    LINEPAY_CHANNEL_ID,
    LINEPAY_RETURN_HOST,
    LINEPAY_SITE,
    LINEPAY_VERSION,
    LINEPAY_CHANNEL_SECRET_KEY,
    LINEPAY_RETURN_CONFIRM_URL,
    LINEPAY_RETURN_CANCEL_URL,
} = process.env;

const pool = require('../database');
function createLinePayBody(order) {
    return {
        ...order,
        currency: "TWD",
        redirectUrls: {
            confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
            cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
        },
    };
}

function createSignature(uri, linePayBody) {
    const nonce = new Date().getTime();
    const encrypt = hmacSHA256(
        `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(linePayBody)}${nonce}`,
        LINEPAY_CHANNEL_SECRET_KEY
    );
    return {
        "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
        "Content-Type": "application/json",
        "X-LINE-Authorization-Nonce": nonce,
        "X-LINE-Authorization": Base64.stringify(encrypt),
    };
}

async function initiatePayment(orderId) {
    const orderInfo = await pool.getOrderInfo(orderId);
    const linePayBody = createLinePayBody(orderInfo);
    const uri = "/payments/request";
    const headers = createSignature(uri, linePayBody);
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });

    if (linePayRes?.data?.returnCode === "0000") {
        return linePayRes.data.info.paymentUrl.web;
    } else {
        throw new Error("LinePay request failed");
    }
}

async function confirmPayment(transactionId, orderId) {
    const orderInfo = await pool.getOrderInfo(orderId);
    const linePayBody = { amount: orderInfo.trade_amt, currency: "TWD" };
    const uri = `/payments/${transactionId}/confirm`;
    const headers = createSignature(uri, linePayBody);
    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;
    const linePayRes = await axios.post(url, linePayBody, { headers });

    if (linePayRes?.data?.returnCode === "0000") {
        await pool.confirmPaymentByCash(orderInfo.id);
    } else {
        throw new Error("LinePay confirmation failed");
    }
}

module.exports = {
    initiatePayment,
    confirmPayment
};
