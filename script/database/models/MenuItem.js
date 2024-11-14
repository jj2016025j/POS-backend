// models/menuItem.js
const { DataTypes, Model } = require('sequelize');

class menuItem extends Model {
    static associate(models) {
        menuItem.belongsToMany(models.subOrder, {
            through: models.subOrderItems,
            foreignKey: 'menuItemId',
            otherKey: 'subOrderId'
        });
        menuItem.hasMany(models.subOrderItems, { foreignKey: 'menuItemId' });
    }
}

menuItem.initModel = (sequelize) => {
    menuItem.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        menuItemName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        image_url: DataTypes.TEXT,
        insupply: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        createTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updateTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {
        sequelize,
        modelName: 'menuItem',
        tableName: 'MenuItems',
    });
};

module.exports = menuItem;
