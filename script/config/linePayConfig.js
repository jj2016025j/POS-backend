// linePayConfig.js

module.exports = {
    LINE_PAY_CHANNEL_ID: process.env.LINE_PAY_CHANNEL_ID,
    LINE_PAY_CHANNEL_SECRET_KEY: process.env.LINE_PAY_CHANNEL_SECRET_KEY,
    LINE_PAY_URL: process.env.LINE_PAY_TEST_URL || 'https://sandbox-api-pay.line.me',
    LINE_PAY_VERSION: process.env.LINE_PAY_VERSION,
};
