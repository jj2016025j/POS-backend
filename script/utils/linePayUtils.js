// utils/linePayUtils.js
const axios = require("axios");
const hmacSHA256 = require("crypto-js/hmac-sha256");
const Base64 = require("crypto-js/enc-base64");

const LINEPAY_CHANNEL_ID = process.env.LINEPAY_CHANNEL_ID;
const LINEPAY_CHANNEL_SECRET_KEY = process.env.LINEPAY_CHANNEL_SECRET_KEY;
const LINEPAY_SITE = process.env.LINEPAY_SITE;
const LINEPAY_VERSION = process.env.LINEPAY_VERSION;
const LINEPAY_RETURN_CONFIRM_URL = process.env.LINEPAY_RETURN_CONFIRM_URL;
const LINEPAY_RETURN_CANCEL_URL = process.env.LINEPAY_RETURN_CANCEL_URL;

const getSignature = (uri, body) => {
    const nonce = Date.now().toString();
    const encryptText = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(body)}${nonce}`;
    return Base64.stringify(hmacSHA256(encryptText, LINEPAY_CHANNEL_SECRET_KEY));
};

exports.initiateLinePayTransaction = async (id) => {
    const uri = "/v3/payments/request";
    const body = {
        amount: 100, // 假設測試金額
        currency: "TWD",
        orderId: id,
        packages: [{ id: "testPackage", amount: 100, name: "Test Product" }],
        redirectUrls: {
            confirmUrl: LINEPAY_RETURN_CONFIRM_URL,
            cancelUrl: LINEPAY_RETURN_CANCEL_URL,
        },
    };

    const headers = {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
        "X-LINE-Authorization-Nonce": Date.now().toString(),
        "X-LINE-Authorization": getSignature(uri, body),
    };

    const response = await axios.post(`${LINEPAY_SITE}${uri}`, body, { headers });
    return response.data.info.paymentUrl.web;
};

exports.confirmLinePayTransaction = async (transactionId, orderId) => {
    const uri = `/v3/payments/${transactionId}/confirm`;
    const body = {
        amount: 100, // 必須與請求時相同
        currency: "TWD",
    };

    const headers = {
        "Content-Type": "application/json",
        "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
        "X-LINE-Authorization-Nonce": Date.now().toString(),
        "X-LINE-Authorization": getSignature(uri, body),
    };

    await axios.post(`${LINEPAY_SITE}${uri}`, body, { headers });
};
