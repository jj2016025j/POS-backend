// models/Table.js
const { DataTypes, Model } = require('sequelize');

class Table extends Model {
  static associate(models) {
      Table.hasMany(models.MainOrder, { foreignKey: 'TableId' });
  }
}

Table.initModel = (sequelize) => {
  Table.init({
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
    MainOrderId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Table',
    tableName: 'Tables',
  });
};

module.exports = Table;

