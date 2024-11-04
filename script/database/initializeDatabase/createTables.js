const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');
const MainOrder = require('../models/MainOrder');
const MainOrderMapping = require('../models/MainOrderMapping');
const SubOrder = require('../models/SubOrder');
const SubOrderMapping = require('../models/SubOrderMapping');
const User = require('../models/User');
const TableOperationsLog = require('../models/TableOperationsLog');

async function createTables(sequelize) {
  // 初始化模型
  Category.initModel(sequelize);
  MenuItem.initModel(sequelize);
  Table.initModel(sequelize);
  MainOrder.initModel(sequelize);
  MainOrderMapping.initModel(sequelize);
  SubOrder.initModel(sequelize);
  SubOrderMapping.initModel(sequelize);
  User.initModel(sequelize);
  TableOperationsLog.initModel(sequelize);

  // 設置表格關聯
  Category.hasMany(MenuItem, { foreignKey: 'CategoryId' });
  MenuItem.belongsTo(Category, { foreignKey: 'CategoryId' });

  Table.hasMany(MainOrder, { foreignKey: 'TableId' });
  MainOrder.belongsTo(Table, { foreignKey: 'TableId' });

  await sequelize.sync({ alter: true });
  console.log('\n所有表格已同步');
}

module.exports = createTables;
