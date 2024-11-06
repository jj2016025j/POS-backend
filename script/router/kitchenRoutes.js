// routes/kitchenRoutes.js
const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/kitchenController');

router.get('/orders', kitchenController.getPendingOrders);
router.post('/order/update', kitchenController.updateOrderStatus);


module.exports = router;