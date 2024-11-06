// routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const { getAllTableInfo, updateTableInfo, getTableInfo, cleanTable } = require('../controllers/tableController');

// 餐桌操作路由 (Table Operations)
router.get('/getAllTableInfo', getAllTableInfo);
router.get('/getTableInfo', getTableInfo);
router.post('/updateTableInfo', updateTableInfo);
router.post('/cleanTable', cleanTable);

module.exports = router;