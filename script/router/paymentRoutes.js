// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { cashCheckout, creditCardCheckout, cancelCheckout, requestLinePay, confirmLinePay } = require('../controllers/paymentController');

// 基礎結帳操作
router.post('/cashCheckout', cashCheckout);
router.post('/creditCardCheckout', creditCardCheckout);
router.post('/cancelCheckout', cancelCheckout);

// Line Pay 操作
router.post('/initiateLinePay', requestLinePay);
router.get('/confirmLinePay', confirmLinePay);

module.exports = router;
