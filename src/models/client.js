import { DataTypes } from "sequelize";
import  sequelize  from "../database/db.js";

export const Client = sequelize.define("client", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  typeDni: {
    type: DataTypes.ENUM(),
    values: ['Cedula', 'Pasaporte', 'RUC']
  },
  dni: {
    type: DataTypes.STRING,
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
  status: {
    type: DataTypes.BOOLEAN
  }
});
