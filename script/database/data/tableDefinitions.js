// db/tableDefinitions.js
const CategoryTable = require('../tables/CategoryTable');
const MenuItemsTable = require('../tables/MenuItemsTable');
const TablesTable = require('../tables/TablesTable');
const MainOrdersTable = require('../tables/MainOrdersTable');
const MainOrderMappingsTable = require('../tables/MainOrderMappingsTable');
const SubOrdersTable = require('../tables/SubOrdersTable');
const SubOrderMappingsTable = require('../tables/SubOrderMappingsTable');
const UsersTable = require('../tables/UsersTable');
const TableOperationsLogTable = require('../tables/TableOperationsLogTable');

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