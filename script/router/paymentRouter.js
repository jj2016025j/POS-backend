// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/cashCheckout', paymentController.cashCheckout);
router.post('/initiateLinePay', paymentController.initiateLinePay);
router.get('/confirmLinePay', paymentController.confirmLinePay);
router.post('/creditCardCheckout', paymentController.creditCardCheckout);
router.post('/cancelCheckout', paymentController.cancelCheckout);

router.post('/checkoutOrder', paymentController.checkoutOrder);
router.get('/successCheckout', paymentController.successCheckout);
module.exports = router;
