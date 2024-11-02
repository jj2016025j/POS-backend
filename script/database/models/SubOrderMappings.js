// models/SubOrderMapping.js
const { DataTypes, Model } = require('sequelize');

class SubOrderMapping extends Model {}

SubOrderMapping.initModel = (sequelize) => {
  SubOrderMapping.init({
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    SubOrderId: { type: DataTypes.STRING, allowNull: false },
    MenuItemId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'SubOrderMapping',
    tableName: 'SubOrderMappings',
  });
};

module.exports = SubOrderMapping;
