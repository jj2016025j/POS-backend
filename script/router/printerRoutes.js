// routes/mainOrderRoutes.js
const express = require('express');
const router = express.Router();
const { printMainOrder, printSubOrder, printInvoice } = require('../controllers/printerController');

// 訂單操作路由 (Order Operations)
router.post('/printMainOrder', printMainOrder);
router.post('/printSubOrder', printSubOrder);
router.post('/printInvoice', printInvoice);

module.exports = router;