const { Sequelize } = require("sequelize");
require("dotenv").config();

const env = process.env;

const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: "mysql",
});

module.exports = sequelize;
