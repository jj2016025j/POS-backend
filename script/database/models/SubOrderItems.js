// models/SubOrderItems.js
const { DataTypes, Model } = require('sequelize');

class SubOrderItems extends Model {}

SubOrderItems.initModel = (sequelize) => {
    SubOrderItems.init({
        SubOrderId: {
            type: DataTypes.STRING, // 確認此類型與 SubOrder 表中的 SubOrderId 一致
            allowNull: false,
            references: {
                model: 'SubOrders',
                key: 'SubOrderId'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        MenuItemId: {
            type: DataTypes.INTEGER, // 確認此類型與 MenuItem 表中的 Id 一致
            allowNull: false,
            references: {
                model: 'MenuItems',
                key: 'Id'
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
        modelName: 'SubOrderItems',
        tableName: 'SubOrderItems',
        timestamps: false
    });
};

module.exports = SubOrderItems;
