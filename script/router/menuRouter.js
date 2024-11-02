// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/getAllMenuItems', menuController.getAllMenuItems);                   // 取得所有品項
router.post('/addNewMenuItem', menuController.addNewMenuItem);                   // 新增菜單項目
router.put('/editMenuItem', menuController.editMenuItem);         // 修改菜單項目
router.delete('/deleteMenuItem', menuController.deleteMenuItem);      // 刪除菜單項目

module.exports = router;
