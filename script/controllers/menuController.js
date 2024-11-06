// controllers/menuController.js
const { MenuItem, Category } = require('../database/models');
const { validateCreateMenuItem, validateEditMenuItem, validateDeleteMenuItem } = require('../validators/menuItemValidator');
const menuService = require('../services/menuService');

const getAllMenuItems = async (req, res, next) => {
    try {
        const menuItems = await menuService.getAllMenuItems(req.query);
        res.status(200).json(menuItems);
    } catch (error) {
        next(error);
    }
};

const addNewMenuItem = async (req, res, next) => {
    try {
        const menuItem = await menuService.addNewMenuItem(req.body);
        res.status(201).json(menuItem);
    } catch (error) {
        next(error);
    }
};

const editMenuItem = async (req, res, next) => {
    try {
        const updatedMenuItem = await menuService.editMenuItem(req.body);
        res.status(200).json(updatedMenuItem);
    } catch (error) {
        next(error);
    }
};

const deleteMenuItem = async (req, res, next) => {
    try {
        await menuService.deleteMenuItem(req.body.menuItemId);
        res.status(200).json({ success: 0 });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMenuItems,
    addNewMenuItem,
    editMenuItem,
    deleteMenuItem
};
