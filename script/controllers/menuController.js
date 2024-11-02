// controllers/menuController.js
const menuService = require('../services/menuService');
const { sendTestResponse } = require('../test/testResponse');

exports.getAllMenuItems = async (req, res) => {
    if (sendTestResponse(res, '取得所有品項API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    try {
        const menuItems = await menuService.getMenuItems();
        res.json({ categories, menuItems });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.addNewMenuItem = async (req, res) => {
    if (sendTestResponse(res, '新增品項API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const menuItem = req.body;
    try {
        const results = await menuService.insertMenuItem(menuItem);
        res.status(201).send("成功插入資料, 插入的ID: " + results.insertId);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.editMenuItem = async (req, res) => {
    if (sendTestResponse(res, '更新品項API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const menuitemId = req.params.menuitemId;
    const itemUpdates = req.body;
    try {
        const results = await menuService.updateMenuItem(menuitemId, itemUpdates);
        if (results.affectedRows === 0) {
            res.status(404).send("未找到需要更新的記錄");
        } else {
            res.status(200).send("更新資料成功，影響的行數：" + results.affectedRows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

exports.deleteMenuItem = async (req, res) => {
    if (sendTestResponse(res, '刪除品項API測試成功')) return; // 若測試模式啟用，直接返回測試訊息

    const item = req.body;
    try {
        const results = await menuService.deleteMenuItem(item);
        res.status(201).send("刪除資料成功，影響的行數：" + results.affectedRows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// exports.getMenuItem = async (req, res) => {
//     if (sendTestResponse(res)) return; // 若測試模式啟用，直接返回測試訊息

//     const menuItemId = req.params.menuItemId;
//     try {
//         const menuItemInfo = await menuService.getMenuItemInfo(menuItemId);
//         res.json(menuItemInfo);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// };
