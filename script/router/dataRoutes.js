// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const { getDataReport } = require('../controllers/dataController');

router.post('/getDataReport', getDataReport);

module.exports = router;
