// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/all', dataController.getAllData);
router.get('/lastMonth', dataController.getLastMonthData);
router.get('/getDataReport', dataController.getDataReport);

module.exports = router;
