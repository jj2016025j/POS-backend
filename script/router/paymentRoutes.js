// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { cashCheckout, creditCardCheckout, cancelCheckout, initiateLinePay, confirmLinePay } = require('../controllers/paymentController');

// 基礎結帳操作
router.post('/checkout/cash', cashCheckout);
router.post('/checkout/credit-card', creditCardCheckout);
router.post('/checkout/cancel', cancelCheckout);

// Line Pay 操作
router.post('/line-pay/initiate', initiateLinePay);
router.get('/line-pay/confirm', confirmLinePay);

module.exports = router;
