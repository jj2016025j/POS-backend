const Category = require('../models/Category');
const menuItem = require('../models/menuItem');
const table = require('../models/table');
const mainOrder = require('../models/mainOrder');
const mainOrderItem = require('../models/mainOrderItem');
const subOrder = require('../models/subOrder');
const subOrderItems = require('../models/subOrderItems');
const user = require('../models/user');
const tableOperationsLog = require('../models/tableOperationsLog');

async function createTables(sequelize) {
  // 初始化模型
  Category.initModel(sequelize);
  menuItem.initModel(sequelize);
  table.initModel(sequelize);
  mainOrder.initModel(sequelize);
  mainOrderItem.initModel(sequelize);
  subOrder.initModel(sequelize);
  subOrderItems.initModel(sequelize);
  user.initModel(sequelize);
  tableOperationsLog.initModel(sequelize);

  // 設置表格關聯
  Category.hasMany(menuItem, { foreignKey: 'categoryId' });
  menuItem.belongsTo(Category, { foreignKey: 'categoryId' });

  table.hasMany(mainOrder, { foreignKey: 'tableNumber' });
  mainOrder.belongsTo(table, { foreignKey: 'tableNumber' });

  await sequelize.sync({});
  // await sequelize.sync({ alter: true, force: true });
  console.log('所有表格已同步\n');
}

module.exports = createTables;
