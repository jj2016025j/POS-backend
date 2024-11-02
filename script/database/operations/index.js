// operations/index.js

const categoryOperations = require('./categoryOperations');
// const dbBasicOperations = require('../dbBasicOperations');
// const dbTableAndDatabaseManagement = require('../dbTableAndDatabaseManagement');
// const generateReports = require('./generateReports');
const menuOperations = require('./menuOperations');
const orderOperations = require('./orderOperations');
// const paymentOperations = require('./paymentOperations');
// const reportOperations = require('./reportOperations');
// const reportQueries = require('./reportQueries');
// const userOperations = require('./userOperations');

module.exports = {
  ...categoryOperations,
  // ...dbBasicOperations,
  // ...dbTableAndDatabaseManagement,
  // ...generateReports,
  ...menuOperations,
  ...orderOperations,
  // ...paymentOperations,
  // ...reportOperations,
  // ...reportQueries,
  // ...userOperations,
};
