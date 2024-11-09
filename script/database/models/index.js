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
Category.associate = (models) => {
    Category.hasMany(models.MenuItem, { foreignKey: 'CategoryId' });
};

MenuItem.associate = (models) => {
    MenuItem.belongsTo(models.Category, { foreignKey: 'CategoryId' });
    MenuItem.belongsToMany(models.SubOrder, {
        through: models.SubOrderItems,
        foreignKey: 'MenuItemId',
        otherKey: 'SubOrderId',
    });
    MenuItem.hasMany(models.SubOrderItems, { foreignKey: 'MenuItemId', as: 'OrderItems' }); // 唯一別名
};

Table.associate = (models) => {
    Table.hasMany(models.MainOrder, { foreignKey: 'TableId' });
};

MainOrder.associate = (models) => {
    MainOrder.belongsTo(models.Table, { foreignKey: 'TableId' });
    MainOrder.hasMany(models.SubOrder, { foreignKey: 'MainOrderId' });
};

SubOrder.associate = (models) => {
    SubOrder.belongsTo(models.MainOrder, { foreignKey: 'MainOrderId' });
    SubOrder.belongsToMany(models.MenuItem, {
        through: models.SubOrderItems,
        foreignKey: 'SubOrderId',
        otherKey: 'MenuItemId',
    });
    SubOrder.hasMany(models.SubOrderItems, { foreignKey: 'SubOrderId', as: 'OrderItems' }); // 唯一別名
};

SubOrderItems.associate = (models) => {
    SubOrderItems.belongsTo(models.MenuItem, { foreignKey: 'MenuItemId', as: 'MenuItem' });
    SubOrderItems.belongsTo(models.SubOrder, { foreignKey: 'SubOrderId', as: 'SubOrder' });
};

// 調用各模型的 associate 方法設置關聯
Category.associate({ MenuItem });
MenuItem.associate({ SubOrder, Category, SubOrderItems });
Table.associate({ MainOrder });
MainOrder.associate({ Table, SubOrder });
SubOrder.associate({ MainOrder, MenuItem, SubOrderItems });
SubOrderItems.associate({ MenuItem, SubOrder });

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
