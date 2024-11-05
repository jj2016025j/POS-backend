// models/index.js
const { sequelize } = require('../../config/databaseConfig');  // 假設資料庫配置在 config/database.js

const Category = require('./Category');
const MainOrderMapping = require('./MainOrderMapping');
const MainOrder = require('./MainOrder');
const MenuItem = require('./MenuItem');
const SubOrderMapping = require('./SubOrderMapping'); // 聯結表模型
const SubOrder = require('./SubOrder');
const TableOperationsLog = require('./TableOperationsLog');
const Table = require('./Table');
const User = require('./User');

// 初始化模型
Category.initModel(sequelize);
MainOrderMapping.initModel(sequelize);
MainOrder.initModel(sequelize);
MenuItem.initModel(sequelize);
SubOrderMapping.initModel(sequelize); // 初始化聯結表模型
SubOrder.initModel(sequelize);
TableOperationsLog.initModel(sequelize);
Table.initModel(sequelize);
User.initModel(sequelize);

// 定義模型關聯 (舉例)
Category.hasMany(MenuItem, { foreignKey: 'CategoryId' });
MenuItem.belongsTo(Category, { foreignKey: 'CategoryId' });

Table.hasMany(MainOrder, { foreignKey: 'TableId' });
MainOrder.belongsTo(Table, { foreignKey: 'TableId' });

MainOrder.hasMany(SubOrder, { foreignKey: 'MainOrderId' });
SubOrder.belongsTo(MainOrder, { foreignKey: 'MainOrderId' });

// 定義 SubOrder 和 MenuItem 之間的多對多關聯
SubOrder.belongsToMany(MenuItem, {
    through: SubOrderMapping,      // 使用聯結表
    foreignKey: 'subOrderId',      // SubOrder 表的鍵
    otherKey: 'menuItemId'         // MenuItem 表的鍵
});

MenuItem.belongsToMany(SubOrder, {
    through: SubOrderMapping,      // 使用聯結表
    foreignKey: 'menuItemId',      // MenuItem 表的鍵
    otherKey: 'subOrderId'         // SubOrder 表的鍵
});

// 導出所有模型和 Sequelize 實例
module.exports = {
    sequelize,
    Category,
    MainOrderMapping,
    MainOrder,
    MenuItem,
    SubOrderMapping,
    SubOrder,
    TableOperationsLog,
    Table,
    User,
};

