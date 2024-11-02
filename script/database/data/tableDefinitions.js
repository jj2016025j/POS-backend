// db/tableDefinitions.js
const CategoryTable = require('../tables/Category');
const MenuItemsTable = require('../tables/MenuItems');
const TablesTable = require('../tables/Tables');
const MainOrdersTable = require('../tables/MainOrders');
const MainOrderMappingsTable = require('../tables/MainOrderMappings');
const SubOrdersTable = require('../tables/SubOrders');
const SubOrderMappingsTable = require('../tables/SubOrderMappings');
const UsersTable = require('../tables/Users');
const TableOperationsLogTable = require('../tables/TableOperationsLog');

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