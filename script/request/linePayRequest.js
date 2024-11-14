const axios = require("axios");
const { LINE_PAY_URL } = require("../config/linePayConfig");
const { createHeaders } = require("../utils/linePayUtils");

/**
 * 發送統一 Line Pay API 請求
 * @param {string} uri - API 的 URI 路徑
 * @param {object} body - 請求的 JSON 主體
 * @returns {object} - 請求結果
 */
async function sendLinePayRequest(uri, body) {
    const headers = createHeaders(uri, body);
    const url = `${LINE_PAY_URL}${uri}`;
    try {
        const response = await axios.post(url, body, { headers });
        if (response.data?.returnCode === "0000") {
            return response.data;
        } else {
            throw new Error(`Line Pay request failed: ${response.data?.returnMessage || "Unknown error"}`);
        }
    } catch (error) {
        console.error(`Line Pay API error on ${uri}:`, error.message);
        throw new Error("Line Pay API 請求失敗");
    }
}

module.exports = { sendLinePayRequest };
