// models/SubOrder.js
const { DataTypes, Model } = require('sequelize');

class SubOrder extends Model {
    static associate(models) {
        // 設置多對多關聯，通過 SubOrderItems 作為聯結表
        SubOrder.belongsToMany(models.MenuItem, {
            through: models.SubOrderItem, // 使用聯結表
            foreignKey: 'subOrderId',
            otherKey: 'menuItemId'
        });
    }
}

SubOrder.initModel = (sequelize) => {
    SubOrder.init({
        Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        SubOrderId: { type: DataTypes.STRING, allowNull: false },
        MainOrderId: { type: DataTypes.STRING, allowNull: false },
        SubTotal: { type: DataTypes.INTEGER, defaultValue: 0 },
        TableId: { type: DataTypes.INTEGER, allowNull: false },
        OrderStatus: { 
            type: DataTypes.ENUM('未製作', '製作中', '已完成', '已取消'), 
            defaultValue: '未製作' 
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
