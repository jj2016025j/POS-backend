// linePayUtils.js
const crypto = require('crypto');
const { LINEPAY_CHANNEL_ID, LINEPAY_CHANNEL_SECRET_KEY, LINEPAY_VERSION } = require('../config/linePayConfig');

function createSignature(uri, body) {
    const nonce = Date.now().toString();
    const encryptText = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(body)}${nonce}`;
    return crypto.createHmac('sha256', LINEPAY_CHANNEL_SECRET_KEY).update(encryptText).digest('base64');
}

function createSignature2(uri, body) {
    const nonce = Date.now().toString();
    const encryptText = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(body)}${nonce}`;
    return Base64.stringify(hmacSHA256(encryptText, LINEPAY_CHANNEL_SECRET_KEY));
}

function createHeaders(uri, body) {
    const nonce = Date.now().toString();
    return {
        'Content-Type': 'application/json',
        'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
        'X-LINE-Authorization-Nonce': nonce,
        'X-LINE-Signature': createSignature(uri, body)
    };
}

module.exports = { createSignature, createHeaders };
