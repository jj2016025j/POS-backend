// models/subOrderItems.js
const { DataTypes, Model } = require('sequelize');

class subOrderItems extends Model {
    static associate(models) {
        // subOrderItems 關聯到 menuItem 和 subOrder
        subOrderItems.belongsTo(models.menuItem, { foreignKey: 'menuItemId' });
        subOrderItems.belongsTo(models.subOrder, { foreignKey: 'subOrderId' });
    }
}

subOrderItems.initModel = (sequelize) => {
    subOrderItems.init({
        subOrderId: {
            type: DataTypes.STRING, // 確認此類型與 subOrder 表中的 subOrderId 一致
            allowNull: false,
            references: {
                model: 'subOrders',
                key: 'subOrderId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        menuItemId: {
            type: DataTypes.INTEGER, // 確認此類型與 menuItem 表中的 id 一致
            allowNull: false,
            references: {
                model: 'MenuItems',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'subOrderItems',
        tableName: 'subOrderItems',
        timestamps: false
    });
};

module.exports = subOrderItems;
