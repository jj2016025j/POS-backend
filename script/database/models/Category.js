// models/Category.js
const { DataTypes, Model } = require('sequelize');

class Category extends Model {
  static associate(models) {
      // 新增與 menuItem 的關聯
      Category.hasMany(models.menuItem, {
          foreignKey: 'categoryId',
          as: 'menuItems' // 可選：設定別名
      });
  }
}

Category.initModel = (sequelize) => {
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    Description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Category',
  });
};

module.exports = Category;
