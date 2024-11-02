// models/User.js
const { DataTypes, Model } = require('sequelize');

class User extends Model {}

User.initModel = (sequelize) => {
  User.init({
    Id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    GoogleID: DataTypes.STRING,
    Date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    Thumbnail: { type: DataTypes.STRING, defaultValue: 'https://img.league-funny.com/imgur/148292128067.jpg' },
    Email: { type: DataTypes.STRING, unique: true },
    Password: DataTypes.STRING,
    LineID: DataTypes.STRING,
    ResetToken: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  });
};

module.exports = User;
