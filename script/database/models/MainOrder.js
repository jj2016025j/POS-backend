// models/MainOrder.js
const { DataTypes, Model } = require('sequelize');

class MainOrder extends Model {
  static associate(models) {
      MainOrder.belongsTo(models.Table, { foreignKey: 'TableId' });
  }
}

MainOrder.initModel = (sequelize) => {
  MainOrder.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    MainOrderId: {
      type: DataTypes.STRING,
      allowNull: false
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
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MainOrder',
    tableName: 'MainOrders',
  });
};

module.exports = MainOrder;
