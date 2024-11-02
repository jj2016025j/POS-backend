// database/database.js

// 匯入基本模組
const { pool, initializeConnection } = require('./connection');
const dbBasic = require('./basic/');

// 匯入操作模組
const categoryOperations = require('./operations/categoryOperations');
const generateReports = require('./operations/generateReports');
const menuOperations = require('./operations/menuOperations');
const orderOperations = require('./operations/orderOperations');
const paymentOperations = require('./operations/paymentOperations');
const reportQueries = require('./operations/reportQueries');
const userOperations = require('./operations/userOperations');

// 匯出所有模組
module.exports = {
    pool,
    initializeConnection,

    dbBasic,

    categoryOperations,
    generateReports,
    menuOperations,
    orderOperations,
    paymentOperations,
    reportQueries,
    userOperations
};
