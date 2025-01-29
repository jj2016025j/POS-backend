// models/mainOrderItem.js
const { DataTypes, Model } = require('sequelize');

class mainOrderItem extends Model {}

mainOrderItem.initModel = (sequelize) => {
  mainOrderItem.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mainOrderId: { type: DataTypes.STRING, allowNull: false },
    menuItemId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    sequelize,
    modelName: 'mainOrderItem',
    tableName: 'MainOrderMappings',
  });
};

module.exports = mainOrderItem;
