const { dbConnection } = require("../db");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

const initUserModel = function () {
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize: dbConnection, modelName: "User" }
  );
  User.sync({ alter: true });
};

module.exports = {
  User,
  initUserModel,
};
