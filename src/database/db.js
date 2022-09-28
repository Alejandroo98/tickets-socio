const Sequelize = require("sequelize");

const sequelize = new Sequelize("tickets", "root", "ricky0812", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
