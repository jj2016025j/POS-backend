// routes/mainOrderRoutes.js
const express = require('express');
const router = express.Router();
const { createSubOrder, deleteSubOrder, getSubOrderInfo, editSubOrder, submitSubOrder, cancelSubOrder } = require('../controllers/subOrderController');

// 子訂單操作路由 (Sub Order Operations)
router.post('/createSubOrder', createSubOrder);
router.get('/getSubOrderInfo', getSubOrderInfo);
router.post('/editSubOrder', editSubOrder);
router.post('/deleteSubOrder', deleteSubOrder);

router.post('/submitSubOrder', submitSubOrder);
router.post('/cancelSubOrder', cancelSubOrder);           // 標記取消

module.exports = router;