// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/getAllMenuItems', menuController.getAllMenuItems);
router.post('/addNewMenuItem', menuController.addNewMenuItem);
router.post('/editMenuItem', menuController.editMenuItem);
router.post('/deleteMenuItem', menuController.deleteMenuItem);
router.get('/getAllCategories', menuController.getAllCategories);

module.exports = router;
