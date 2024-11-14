const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');
const mainOrder = require('../models/mainOrder');
const MainOrderMapping = require('../models/MainOrderMapping');
const SubOrder = require('../models/SubOrder');
const SubOrderItems = require('../models/SubOrderItems');
const User = require('../models/User');
const TableOperationsLog = require('../models/TableOperationsLog');

async function createTables(sequelize) {
  // 初始化模型
  Category.initModel(sequelize);
  MenuItem.initModel(sequelize);
  Table.initModel(sequelize);
  mainOrder.initModel(sequelize);
  MainOrderMapping.initModel(sequelize);
  SubOrder.initModel(sequelize);
  SubOrderItems.initModel(sequelize);
  User.initModel(sequelize);
  TableOperationsLog.initModel(sequelize);

  // 設置表格關聯
  Category.hasMany(MenuItem, { foreignKey: 'CategoryId' });
  MenuItem.belongsTo(Category, { foreignKey: 'CategoryId' });

  Table.hasMany(mainOrder, { foreignKey: 'TableId' });
  mainOrder.belongsTo(Table, { foreignKey: 'TableId' });

  await sequelize.sync({});
  // await sequelize.sync({ alter: true, force: true });
  console.log('所有表格已同步\n');
}

module.exports = createTables;
