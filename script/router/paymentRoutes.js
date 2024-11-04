// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { cashCheckout, creditCardCheckout, cancelCheckout, initiateLinePay, confirmLinePay } = require('../controllers/paymentController');

// 基礎結帳操作
router.post('/cashCheckout', cashCheckout);
router.post('/creditCardCheckout', creditCardCheckout);
router.post('/cancelCheckout', cancelCheckout);

// Line Pay 操作
router.post('/initiateLinePay', initiateLinePay);
router.get('/confirmLinePay', confirmLinePay);

module.exports = router;
