import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import { User } from "./user.js";

export const Rol = sequelize.define("rol", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
  },
  typeRol: {
    type: DataTypes.ENUM(),
    values: ["principal", "subRol"],
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
});

Rol.hasMany(User, {
  foreignKey: "rolId",
  sourceKey: "id",
});

User.belongsTo(Rol, {
  foreignKey: "rolId",
  targetId: "id",
});
