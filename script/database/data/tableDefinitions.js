// db/tableDefinitions.js
const CategoryTable = require('../tables/Category');
const MenuItemsTable = require('../tables/MenuItems');
const TablesTable = require('../tables/Tables');
const MainOrdersTable = require('../tables/MainOrders');
const MainOrderMappingsTable = require('../tables/MainOrderMappings');
const SubOrdersTable = require('../tables/subOrders');
const SubOrderMappingsTable = require('../tables/SubOrderMappings');
const UsersTable = require('../tables/users');
const TableOperationsLogTable = require('../tables/tableOperationsLog');

module.exports = {
  CategoryTable,
  MenuItemsTable,
  TablesTable,
  MainOrdersTable,
  MainOrderMappingsTable,
  SubOrdersTable,
  SubOrderMappingsTable,
  UsersTable,
  TableOperationsLogTable,
};