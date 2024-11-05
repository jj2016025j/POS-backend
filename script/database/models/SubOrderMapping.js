const { DataTypes, Model } = require('sequelize');

class SubOrderItem extends Model {}

SubOrderItem.initModel = (sequelize) => {
    SubOrderItem.init({
        subOrderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'SubOrders',
                key: 'Id'
            }
        },
        menuItemId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'MenuItems',
                key: 'Id'
            }
        },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        price: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        modelName: 'SubOrderItem',
        tableName: 'SubOrderItems'
    });
};

module.exports = SubOrderItem;
