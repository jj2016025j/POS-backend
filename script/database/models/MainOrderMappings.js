// models/MainOrderMapping.js
const { DataTypes, Model } = require('sequelize');

class MainOrderMapping extends Model {}

MainOrderMapping.initModel = (sequelize) => {
  MainOrderMapping.init({
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    MainOrderId: { type: DataTypes.STRING, allowNull: false },
    MenuItemId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'MainOrderMapping',
    tableName: 'MainOrderMappings',
  });
};

module.exports = MainOrderMapping;
