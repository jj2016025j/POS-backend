const { sequelize } = require('../../config/databaseConfig');

const Category = require('./Category');
const mainOrder = require('./mainOrder');
const menuItem = require('./menuItem');
const subOrderItems = require('./subOrderItems'); 
const subOrder = require('./subOrder');
const table = require('./table');
const user = require('./user');
const mainOrderItem = require('./mainOrderItem');
const tableOperationsLog = require('./tableOperationsLog');

// 初始化模型
Category.initModel(sequelize);
mainOrder.initModel(sequelize);
menuItem.initModel(sequelize);
subOrderItems.initModel(sequelize);
subOrder.initModel(sequelize);
table.initModel(sequelize);
user.initModel(sequelize);
mainOrderItem.initModel(sequelize);
tableOperationsLog.initModel(sequelize);

// 設置表格關聯
Category.associate = (models) => {
    Category.hasMany(models.menuItem, { foreignKey: 'categoryId' });
};

menuItem.associate = (models) => {
    menuItem.belongsTo(models.Category, { foreignKey: 'categoryId' });
    menuItem.belongsToMany(models.subOrder, {
        through: models.subOrderItems,
        foreignKey: 'menuItemId',
        otherKey: 'subOrderId',
    });
    menuItem.hasMany(models.subOrderItems, { foreignKey: 'menuItemId', as: 'OrderItems' }); // 唯一別名
};

table.associate = (models) => {
    table.hasMany(models.mainOrder, { foreignKey: 'tableNumber' });
};

mainOrder.associate = (models) => {
    mainOrder.belongsTo(models.table, { foreignKey: 'tableNumber' });
    mainOrder.hasMany(models.subOrder, { foreignKey: 'mainOrderId' });
};

subOrder.associate = (models) => {
    subOrder.belongsTo(models.mainOrder, { foreignKey: 'mainOrderId' });
    subOrder.belongsToMany(models.menuItem, {
        through: models.subOrderItems,
        foreignKey: 'subOrderId',
        otherKey: 'menuItemId',
    });
    subOrder.hasMany(models.subOrderItems, { foreignKey: 'subOrderId', as: 'OrderItems' }); // 唯一別名
};

subOrderItems.associate = (models) => {
    subOrderItems.belongsTo(models.menuItem, { foreignKey: 'menuItemId', as: 'menuItem' });
    subOrderItems.belongsTo(models.subOrder, { foreignKey: 'subOrderId', as: 'subOrder' });
};

// 調用各模型的 associate 方法設置關聯
Category.associate({ menuItem });
menuItem.associate({ subOrder, Category, subOrderItems });
table.associate({ mainOrder });
mainOrder.associate({ table, subOrder });
subOrder.associate({ mainOrder, menuItem, subOrderItems });
subOrderItems.associate({ menuItem, subOrder });

// 導出所有模型和 Sequelize 實例
module.exports = {
    sequelize,
    Category,
    mainOrder,
    menuItem,
    subOrderItems,
    subOrder,
    table,
    user,
    mainOrderItem,
    tableOperationsLog
};
