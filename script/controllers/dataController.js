// controllers/dataController.js
const pool = require('../database/operations');
const { generateDateArray, generateClassificationData, generateItemData, fillMissingDatesAndRandom } = require('../utils/dataUtils');
const { sendTestResponse } = require('../test/testResponse');

exports.getAllData = async (req, res) => {
    try {
        const sellData = await pool.getBackEndData('all', 'all', 'month');
        res.json(sellData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.getLastMonthData = async (req, res) => {
    try {
        const sellData = await pool.getBackEndData('lastMonth', 'byItem');
        res.json(sellData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

exports.getDataReport = (req, res) => {
    if (sendTestResponse(res, '取得後臺報表 API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const { startTime, endTime, statisticalContent } = req.body;

    // Log the received parameters
    console.log('Received parameters:', { startTime, endTime, statisticalContent });

    if (!startTime || !endTime || !statisticalContent) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const completeData = fillMissingDatesAndRandom([], startTime, endTime, statisticalContent);
    res.json(completeData);
};
