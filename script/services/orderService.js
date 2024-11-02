// services/orderService.js
const pool = require('../database/operations');

exports.generateMainOrderId = async () => {
    return pool.generateMainOrderId();
};

exports.getTableInfoByTableNumber = async (tableNumber) => {
    return pool.getTableInfoBytableNumber(tableNumber);
};

exports.createMainOrder = async (mainOrderId, tableNumber) => {
    await pool.makeNewMainOrder(mainOrderId, tableNumber);
};

exports.updateTableInfo = async (tableNumber, status, mainOrderId) => {
    await pool.editTableInfo(tableNumber, status, mainOrderId);
};

exports.getTableInfoByMainOrderId = async (mainOrderId) => {
    return pool.getTableInfoByMainOrderId(mainOrderId);
};

exports.getAllTableStatus = async () => {
    return pool.getAllTableStatus();
};

exports.getMainOrderInfo = async (mainOrderId) => {
    return pool.getMainOrderInfoById(mainOrderId);
};

exports.getRecentOrders = async () => {
    return pool.getOrders();
};

exports.createSubOrder = async (mainOrderId) => {
    return pool.MakeNewSubOrder(mainOrderId);
};

exports.submitSubOrder = async (subOrderId, subOrder) => {
    await pool.sendSubOrder(subOrderId, subOrder);
};

exports.cleanTable = async (tableNumber, status) => {
    await pool.editTableInfo(tableNumber, status, "");
};

exports.deleteMenuItemFromSubOrder = async (subOrderId, menuItemId) => {
    return pool.deleteMenuItemFromSubOrder(subOrderId, menuItemId);
};

exports.getSubOrderInfo = async (subOrderId) => {
    return pool.getSubOrderInfo(subOrderId);
};

exports.getMainAndSubOrder = async (mainOrderId) => {
    return pool.getMainAndSubOrder(mainOrderId);
};
