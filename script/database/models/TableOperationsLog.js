// models/TableOperationsLog.js
const { DataTypes, Model } = require('sequelize');

class TableOperationsLog extends Model {}

TableOperationsLog.initModel = (sequelize) => {
  TableOperationsLog.init({
    Id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    TableName: { type: DataTypes.STRING, allowNull: false },
    Operation: { type: DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE'), allowNull: false },
    OperationTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    User: DataTypes.STRING,
    RecordId: DataTypes.STRING,
    BeforeValue: DataTypes.TEXT,
    AfterValue: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'TableOperationsLog',
    tableName: 'TableOperationsLog',
  });
};

module.exports = TableOperationsLog;
