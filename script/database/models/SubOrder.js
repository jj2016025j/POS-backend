// models/SubOrder.js
const { DataTypes, Model } = require('sequelize');

class SubOrder extends Model {
    static associate(models) {
        SubOrder.belongsToMany(models.MenuItem, {
            through: models.SubOrderItems, // 使用聯結表
            foreignKey: 'SubOrderId',
            otherKey: 'MenuItemId'
        });
        SubOrder.belongsTo(models.MainOrder, { foreignKey: 'MainOrderId' });
    }
}

SubOrder.initModel = (sequelize) => {
    SubOrder.init({
        SubOrderId: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
        MainOrderId: { type: DataTypes.STRING, allowNull: false },
        SubTotal: { type: DataTypes.INTEGER, defaultValue: 0 },
        TableId: { type: DataTypes.INTEGER, allowNull: true },
        OrderStatus: {
            type: DataTypes.ENUM('無餐點', '製作中', '已完成', '已取消'),
            defaultValue: '無餐點'
        },
        CreateTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        UpdateTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        sequelize,
        modelName: 'SubOrder',
        tableName: 'SubOrders',
    });
};

module.exports = SubOrder;
