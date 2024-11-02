// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const { getDataReport } = require('../controllers/dataController');

router.get('/getDataReport', getDataReport);

module.exports = router;
