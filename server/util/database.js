const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const sequelize = new Sequelize(
  "node-complete",
  "root",
  process.env.MYSQL_DB_PASSWORD,
  { dialect: "mysql", host: "localhost" }
);
module.exports = sequelize;
