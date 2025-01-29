// routes/mainOrderRoutes.js
const express = require('express');
const router = express.Router();
const { createMainOrder, getMainOrderInfo, getRecentOrders, editMainOrder } = require('../controllers/mainOrderController');
const { printQRCode } = require('../controllers/printerController');

// 訂單操作路由 (Order Operations)
router.post('/createNewOrder', createMainOrder);
router.post('/getMainOrderInfo', getMainOrderInfo);
router.post('/editMainOrder', editMainOrder);
router.get('/getRecentOrders', getRecentOrders);
router.post('/printQRcode', printQRCode);


module.exports = router;