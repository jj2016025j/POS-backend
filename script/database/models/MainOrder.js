// models/mainOrder.js
const { DataTypes, Model } = require('sequelize');

class mainOrder extends Model {
  static associate(models) {
      mainOrder.belongsTo(models.Table, { foreignKey: 'TableId' });
  }
}

mainOrder.initModel = (sequelize) => {
  mainOrder.init({
    mainOrderId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    SubTotal: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ServiceFee: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    Total: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    TableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OrderStatus: {
      type: DataTypes.ENUM('未結帳', '已結帳', '已取消'),
      defaultValue: '未結帳'
    },
    CreateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    UpdateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    PaymentMethod: {
      type: DataTypes.ENUM('現金', '信用卡', 'Line pay'),
      defaultValue: '現金'
    },
    
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'mainOrder',
    tableName: 'MainOrders',
  });
};

module.exports = mainOrder;
