// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTableInfo, updateTableInfo, getTableInfo, cleanTable, resetAllTable } = require('../controllers/tableController');

// 餐桌操作路由 (table Operations)
router.get('/getAllTableInfo', getAllTableInfo);
router.post('/getTableInfo', getTableInfo);
router.post('/updateTableInfo', updateTableInfo);
router.post('/cleanTable', cleanTable);
router.post('/resetAllTable', resetAllTable);

module.exports = router;