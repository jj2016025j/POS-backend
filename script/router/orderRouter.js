// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/createNewOrder', orderController.createNewOrder);
router.post('/printQRcode', orderController.printQRCode);
router.get('/getAllTableStatus', orderController.getAllTableStatus);
router.post('/addSubOrder', orderController.addSubOrder);
router.post('/submitSubOrder', orderController.submitSubOrder);
router.get('/getMainOrder', orderController.getMainOrderInfo);
router.post('/cleanTable', orderController.cleanTable);
router.post('/deleteMenuItem', orderController.deleteMenuItem);
router.get('/getrecentorders', orderController.getRecentOrders);
router.get('/getMainOrderInfo', orderController.getMainOrderInfo);
router.get('/getSubOrderInfo', orderController.getSubOrderInfo);
router.post('/editOrder', orderController.editOrder);

module.exports = router;
