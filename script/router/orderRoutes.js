// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createMainOrder, getMainOrderInfo, getRecentOrders, editMainOrder } = require('../controllers/mainOrderController');
const { createSubOrder, deleteSubOrderItem, getSubOrderInfo, editSubOrder } = require('../controllers/subOrderController');
const { getAllTableInfo, updateTableInfo } = require('../controllers/tableController');
const { printQRCode } = require('../controllers/printerController');

// 餐桌操作路由 (Table Operations)
router.get('/getAllTableInfo', getAllTableInfo);
router.post('/updateTableInfo', updateTableInfo);

// 訂單操作路由 (Order Operations)
router.post('/createNewOrder', createMainOrder);
router.get('/getMainOrderInfo', getMainOrderInfo);
router.post('/editMainOrder', editMainOrder);
router.get('/getRecentOrders', getRecentOrders);

router.post('/printQRcode', printQRCode);

// 子訂單操作路由 (Sub Order Operations)
router.post('/createSubOrder', createSubOrder);
router.get('/getSubOrderInfo', getSubOrderInfo);
router.post('/editSubOrder', editSubOrder);
router.post('/deleteSubOrderItem', deleteSubOrderItem);


module.exports = router;