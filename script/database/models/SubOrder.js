// models/subOrder.js
const { DataTypes, Model } = require('sequelize');

class subOrder extends Model {
    static associate(models) {
        subOrder.belongsToMany(models.menuItem, {
            through: models.subOrderItems, // 使用聯結表
            foreignKey: 'subOrderId',
            otherKey: 'menuItemId'
        });
        subOrder.belongsTo(models.mainOrder, { foreignKey: 'mainOrderId' });
        subOrder.hasMany(models.subOrderItems, { foreignKey: 'subOrderId' });
    }
}

subOrder.initModel = (sequelize) => {
    subOrder.init({
        subOrderId: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
        mainOrderId: { type: DataTypes.STRING, allowNull: false },
        subTotal: { type: DataTypes.INTEGER, defaultValue: 0 },
        tableId: { type: DataTypes.INTEGER, allowNull: true },
        orderStatus: {
            type: DataTypes.ENUM('無餐點', '製作中', '已完成', '已取消'),
            defaultValue: '無餐點'
        },
        createTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updateTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        sequelize,
        modelName: 'subOrder',
        tableName: 'subOrders',
    });
};

module.exports = subOrder;
