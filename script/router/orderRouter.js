// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createMainOrder, getMainOrderInfo, getRecentOrders, editOrder } = require('../controllers/mainOrderController');
const { createSubOrder, submitSubOrder, getSubOrderInfo, editSubOrder } = require('../controllers/subOrderController');
const { getAllTableInfo, updateTableInfo } = require('../controllers/tableController');
const { printQRCode } = require('../controllers/printerController');

// 訂單操作路由 (Order Operations)
router.post('/createNewOrder', createMainOrder);
router.get('/getMainOrderInfo', getMainOrderInfo);
router.get('/getRecentOrders', getRecentOrders);
router.post('/editOrder', editOrder);

// 子訂單操作路由 (Sub Order Operations)
router.post('/createSubOrder', createSubOrder);
router.post('/submitSubOrder', submitSubOrder);
router.get('/getSubOrderInfo', getSubOrderInfo);
router.post('/editSubOrder', editSubOrder);

// 餐桌操作路由 (Table Operations)
router.get('/getAllTableInfo', getAllTableInfo);
router.post('/updateTableInfo', updateTableInfo);

router.post('/printQRcode', printQRCode);

module.exports = router;