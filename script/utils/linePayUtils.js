// 引入所需模組：crypto-js 用於生成 HMAC-SHA256 簽名和 Base64 編碼，crypto 用於 Node.js 原生加密
const crypto = require('crypto');

// 從 linePayConfig 中導入必要的配置信息
const { LINEPAY_CHANNEL_ID, LINEPAY_CHANNEL_SECRET_KEY, LINEPAY_VERSION } = require('../config/linePayConfig');

/**
 * 使用 Node.js 原生 crypto 庫生成簽名
 * 
 * @param {string} uri - API 的 URI 路徑
 * @param {object} body - 請求的 JSON 主體
 * @returns {string} - 以 base64 編碼的 HMAC-SHA256 簽名
 */
function createSignature(uri, body) {
    const nonce = Date.now().toString(); // 使用當前時間戳作為 nonce 值
    const encryptText = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(body)}${nonce}`;
    return crypto.createHmac('sha256', LINEPAY_CHANNEL_SECRET_KEY).update(encryptText).digest('base64');
}

/**
 * 建立請求的 headers，包含必需的簽名
 * 
 * @param {string} uri - API 的 URI 路徑
 * @param {object} body - 請求的 JSON 主體
 * @returns {object} - 包含 Content-Type、ChannelId、Nonce 和簽名的 headers
 */
function createHeaders(uri, body) {
    const nonce = Date.now().toString(); // 使用當前時間戳作為 nonce 值
    return {
        'Content-Type': 'application/json', // 設置內容類型為 JSON
        'X-LINE-ChannelId': LINEPAY_CHANNEL_ID, // Line Pay 的 Channel ID
        'X-LINE-ChannelSecret': LINEPAY_CHANNEL_SECRET_KEY, // Line Pay 的 LINEPAY CHANNEL SECRET KEY
        'X-LINE-Authorization-Nonce': nonce, // 每次請求的唯一 nonce 值
        'X-LINE-Signature': createSignature(uri, body) // 使用 createSignature 生成的簽名
    };
}

// 將 createSignature 和 createHeaders 函數導出以便在其他模組中使用
module.exports = { createSignature, createHeaders };
