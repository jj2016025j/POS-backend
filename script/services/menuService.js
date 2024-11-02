// services/menuService.js
const pool = require('../database/operations');

exports.getMenuItemInfo = async (menuItemId) => {
    return pool.getMenuItemInfo(menuItemId);
};

exports.getMenuItems = async () => {
    return pool.getMenuItems();
};

exports.insertMenuItem = async (menuItem) => {
    return pool.insertIntoMenuItem(menuItem, menuItem.categoryId, menuItem.index);
};

exports.updateMenuItem = async (menuitemId, itemUpdates) => {
    return pool.updateMenuItem(menuitemId, itemUpdates);
};

exports.deleteMenuItem = async (item) => {
    return pool.deleteMenuItems(item);
};
