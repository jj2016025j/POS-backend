// models/mainOrder.js
const { DataTypes, Model } = require('sequelize');

class mainOrder extends Model {
  static associate(models) {
      mainOrder.belongsTo(models.table, { foreignKey: 'tableNumber' });
  }
}

mainOrder.initModel = (sequelize) => {
  mainOrder.init({
    mainOrderId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    subTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    serviceFee: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    tableNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.ENUM('未結帳', '已結帳', '已取消'),
      defaultValue: '未結帳'
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    paymentMethod: {
      type: DataTypes.ENUM('現金', '信用卡', 'Line pay'),
      defaultValue: '現金'
    },
    
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'mainOrder',
    tableName: 'MainOrders',
  });
};

module.exports = mainOrder;
