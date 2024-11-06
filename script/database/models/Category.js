// models/Category.js
const { DataTypes, Model } = require('sequelize');

class Category extends Model { }

Category.initModel = (sequelize) => {
  Category.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    CategoryName: {
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
