// models/user.js
const { DataTypes, Model } = require('sequelize');

class user extends Model {}

user.initModel = (sequelize) => {
  user.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    googleID: DataTypes.STRING,
    createTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    thumbnail: { type: DataTypes.STRING, defaultValue: 'https://img.league-funny.com/imgur/148292128067.jpg' },
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    lineID: DataTypes.STRING,
    resetToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users',
  });
};

module.exports = user;
