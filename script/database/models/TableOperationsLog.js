// models/tableOperationsLog.js
const { DataTypes, Model } = require('sequelize');

class tableOperationsLog extends Model { }

tableOperationsLog.initModel = (sequelize) => {
  tableOperationsLog.init({
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    tableName: { type: DataTypes.STRING, allowNull: false },
    operation: { type: DataTypes.ENUM('INSERT', 'UPDATE', 'DELETE'), allowNull: false },
    operationTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    user: DataTypes.STRING,
    recordId: DataTypes.STRING,
    beforeValue: DataTypes.TEXT,
    afterValue: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'tableOperationsLog',
    tableName: 'tableOperationsLog',
  });
};

module.exports = tableOperationsLog;
