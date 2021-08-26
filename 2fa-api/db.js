const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  }
);

const dbConnect = async function () {
  try {
    await dbConnection.authenticate();
    console.log("DB Connected!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  dbConnect,
  dbConnection,
};
