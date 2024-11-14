// models/table.js
const { DataTypes, Model } = require('sequelize');

class table extends Model {
  static associate(models) {
      table.hasMany(models.mainOrder, { foreignKey: 'tableId' });
  }
}

table.initModel = (sequelize) => {
  table.init({
    TableNumber: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      unique: true,
      primaryKey: true
    },
    TablesStatus: { 
      type: DataTypes.ENUM('空桌', '點餐中', '製作中', '用餐中', '清潔中'), 
      defaultValue: '空桌' 
    },
    mainOrderId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'table',
    tableName: 'Tables',
  });
};

module.exports = table;

