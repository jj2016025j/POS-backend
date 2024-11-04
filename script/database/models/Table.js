// models/Table.js
const { DataTypes, Model } = require('sequelize');

class Table extends Model {}

Table.initModel = (sequelize) => {
  Table.init({
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    TableNumber: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      unique: true  // 設置唯一約束，確保桌號不重複
    },
    TablesStatus: { 
      type: DataTypes.ENUM('空桌', '點餐中', '待確認', '製作中', '用餐中', '清潔中'), 
      defaultValue: '空桌' 
    },
    MainOrderId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Table',
    tableName: 'Tables',
  });
};

module.exports = Table;

