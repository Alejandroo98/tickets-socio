import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || 'tickets',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || 'ricky0812',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_TYPE || 'mysql',
  }
);

export default sequelize
