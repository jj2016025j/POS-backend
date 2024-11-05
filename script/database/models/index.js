// models/index.js
const { sequelize } = require('../../config/databaseConfig');

const Category = require('./Category');
const MainOrder = require('./MainOrder');
const MenuItem = require('./MenuItem');
const SubOrderItems = require('./SubOrderItems'); 
const SubOrder = require('./SubOrder');
const Table = require('./Table');
const User = require('./User');
const MainOrderMapping = require('./MainOrderMapping');
const TableOperationsLog = require('./TableOperationsLog');

// 初始化模型
Category.initModel(sequelize);
MainOrder.initModel(sequelize);
MenuItem.initModel(sequelize);
SubOrderItems.initModel(sequelize);
SubOrder.initModel(sequelize);
Table.initModel(sequelize);
User.initModel(sequelize);
MainOrderMapping.initModel(sequelize);
TableOperationsLog.initModel(sequelize);

// 設置表格關聯
Category.hasMany(MenuItem, { foreignKey: 'CategoryId' });
MenuItem.belongsTo(Category, { foreignKey: 'CategoryId' });

Table.hasMany(MainOrder, { foreignKey: 'TableId' });
MainOrder.belongsTo(Table, { foreignKey: 'TableId' });

MainOrder.hasMany(SubOrder, { foreignKey: 'MainOrderId' });
SubOrder.belongsTo(MainOrder, { foreignKey: 'MainOrderId' });

Table.associate({ MainOrder });
MainOrder.associate({ Table });

SubOrder.belongsToMany(MenuItem, {
    through: SubOrderItems,
    foreignKey: 'SubOrderId',
    otherKey: 'MenuItemId'
});

MenuItem.belongsToMany(SubOrder, {
    through: SubOrderItems,
    foreignKey: 'MenuItemId',
    otherKey: 'SubOrderId'
});

// 導出所有模型和 Sequelize 實例
module.exports = {
    sequelize,
    Category,
    MainOrder,
    MenuItem,
    SubOrderItems,
    SubOrder,
    Table,
    User,
    MainOrderMapping,
    TableOperationsLog
};
