import { DataTypes } from "sequelize";
import  sequelize  from "../database/db.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  dni: {
    type: DataTypes.STRING,
  },
  typeDni: {
    type: DataTypes.ENUM(),
    values: ['Cedula', 'Pasaporte', 'RUC']
  },
  name: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  photo: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.BOOLEAN
  }
});
