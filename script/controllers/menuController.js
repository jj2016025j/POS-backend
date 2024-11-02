// controllers/menuController.js
const { MenuItem, Category } = require('../models');

const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll({ include: Category });
        res.json({ menuItems });
    } catch (error) {
        console.error("Failed to get menu items:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

const addNewMenuItem = async (req, res) => {
    try {
        const menuItem = await MenuItem.create(req.body);
        res.status(201).json(menuItem);
    } catch (error) {
        console.error("Failed to add menu item:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

const editMenuItem = async (req, res) => {
    try {
        const updatedRows = await MenuItem.update(req.body, {
            where: { Id: req.params.menuitemId }
        });
        if (updatedRows[0] === 0) {
            return res.status(404).json({ error: "未找到需要更新的記錄" });
        }
        res.status(200).json({ message: "更新資料成功" });
    } catch (error) {
        console.error("Failed to update menu item:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const deletedRows = await MenuItem.destroy({
            where: { Id: req.body.menuItemId }
        });
        if (deletedRows === 0) {
            return res.status(404).json({ error: "未找到需要刪除的記錄" });
        }
        res.status(200).json({ message: "刪除成功", deletedRows });
    } catch (error) {
        console.error("Failed to delete menu item:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

// 導出為物件
module.exports = {
    getAllMenuItems,
    addNewMenuItem,
    editMenuItem,
    deleteMenuItem
};
