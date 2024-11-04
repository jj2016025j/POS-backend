// controllers/menuController.js
const { MenuItem, Category } = require('../database/models');

const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll({ include: Category });
        res.json({ menuItems });
    } catch (error) {
        console.error("取得菜單項目失敗:", error);
        res.status(500).json({ error: '伺服器錯誤' });
    }
};

const addNewMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json(menuItem);
    } catch (error) {
        console.error("新增菜單項目失敗:", error);
        res.status(500).json({ error: '伺服器錯誤' });
    }
};

const editMenuItem = async (req, res) => {
    try {
        const item = req.body; // 將 ID 與其他數據分開
        const updatedRows = await MenuItem.update(item, {
            where: { Id: item.menuitemId }
        });
        if (updatedRows[0] === 0) {
            return res.status(404).json({ error: "未找到需要更新的記錄" });
        }
        res.status(200).json({ message: "更新資料成功" });
    } catch (error) {
        console.error("更新菜單項目失敗:", error);
        res.status(500).json({ error: '伺服器錯誤' });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const { menuItemId } = req.body; // 將 menuItemId 從請求體中取得
        const deletedRows = await MenuItem.destroy({
            where: { Id: menuItemId }
        });
        if (deletedRows === 0) {
            return res.status(404).json({ error: "未找到需要刪除的記錄" });
        }
        res.status(200).json({ message: "刪除成功", deletedRows });
    } catch (error) {
        console.error("刪除菜單項目失敗:", error);
        res.status(500).json({ error: '伺服器錯誤' });
    }
};

// 導出為物件
module.exports = {
    getAllMenuItems,
    addNewMenuItem,
    editMenuItem,
    deleteMenuItem
};
