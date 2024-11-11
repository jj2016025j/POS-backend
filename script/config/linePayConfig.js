// linePayConfig.js

module.exports = {
    channelId: process.env.LINE_PAY_CHANNEL_ID,
    channelSecret: process.env.LINE_PAY_CHANNEL_SECRET,
    linePayUrl: process.env.LINE_PAY_API_URL || 'https://sandbox-api-pay.line.me',

    LINE_PAY_CHANNEL_ID: process.env.LINE_PAY_CHANNEL_ID,
    LINE_PAY_CHANNEL_SECRET_KEY: process.env.LINE_PAY_CHANNEL_SECRET_KEY,
    LINE_PAY_SITE: process.env.LINE_PAY_SITE || 'https://sandbox-api-pay.line.me',
    LINE_PAY_VERSION: process.env.LINE_PAY_VERSION,
    LINE_PAY_RETURN_HOST: process.env.LINE_PAY_RETURN_HOST,
    LINE_PAY_RETURN_CONFIRM_URL: process.env.LINE_PAY_RETURN_CONFIRM_URL,
    LINE_PAY_RETURN_CANCEL_URL: process.env.LINE_PAY_RETURN_CANCEL_URL,
};
