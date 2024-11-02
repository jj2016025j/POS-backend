// models/MenuItem.js
const { DataTypes, Model } = require('sequelize');

class MenuItem extends Model {}

MenuItem.initModel = (sequelize) => {
  MenuItem.init({
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    MenuItemName: { type: DataTypes.STRING, allowNull: false },
    CategoryId: { type: DataTypes.INTEGER, allowNull: false },
    Price: { type: DataTypes.INTEGER, allowNull: false },
    image_url: DataTypes.TEXT,
    Insupply: { type: DataTypes.BOOLEAN, defaultValue: true },
    CreateTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    UpdateTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    sequelize,
    modelName: 'MenuItem',
    tableName: 'MenuItems',
  });
};

module.exports = MenuItem;
