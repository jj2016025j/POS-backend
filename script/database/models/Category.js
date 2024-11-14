// models/Category.js
const { DataTypes, Model } = require('sequelize');

class Category extends Model { }

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
