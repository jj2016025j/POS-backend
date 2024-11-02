// models/index.js
const { sequelize } = require('../config');  // 假設資料庫配置在 config/database.js

const Category = require('./Category');
const MainOrderMappings = require('./MainOrderMappings');
const MainOrders = require('./MainOrders');
const MenuItems = require('./MenuItems');
const SubOrderMappings = require('./SubOrderMappings');
const SubOrders = require('./SubOrders');
const TableOperationsLog = require('./TableOperationsLog');
const Tables = require('./Tables');
const Users = require('./Users');

// 初始化模型
Category.initModel(sequelize);
MainOrderMappings.initModel(sequelize);
MainOrders.initModel(sequelize);
MenuItems.initModel(sequelize);
SubOrderMappings.initModel(sequelize);
SubOrders.initModel(sequelize);
TableOperationsLog.initModel(sequelize);
Tables.initModel(sequelize);
Users.initModel(sequelize);

// 定義模型關聯 (舉例)
Category.hasMany(MenuItems, { foreignKey: 'CategoryId' });
MenuItems.belongsTo(Category, { foreignKey: 'CategoryId' });

Tables.hasMany(MainOrders, { foreignKey: 'TableId' });
MainOrders.belongsTo(Tables, { foreignKey: 'TableId' });

MainOrders.hasMany(SubOrders, { foreignKey: 'MainOrderId' });
SubOrders.belongsTo(MainOrders, { foreignKey: 'MainOrderId' });

// 導出所有模型和 Sequelize 實例
module.exports = {
    sequelize,
    Category,
    MainOrderMappings,
    MainOrders,
    MenuItems,
    SubOrderMappings,
    SubOrders,
    TableOperationsLog,
    Tables,
    Users,
};
