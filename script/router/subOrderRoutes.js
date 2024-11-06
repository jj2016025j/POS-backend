// routes/mainOrderRoutes.js
const express = require('express');
const router = express.Router();
const { createSubOrder, deleteSubOrder, getSubOrderInfo, editSubOrder } = require('../controllers/subOrderController');

// 子訂單操作路由 (Sub Order Operations)
router.post('/createSubOrder', createSubOrder);
router.get('/getSubOrderInfo', getSubOrderInfo);
router.post('/editSubOrder', editSubOrder);
router.post('/deleteSubOrder', deleteSubOrder);

module.exports = router;