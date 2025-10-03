import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Product = sequelize.define(
  "Product",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    image_url: DataTypes.STRING,
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    cogs: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    price: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  },
  {
    tableName: "products", 
    freezeTableName: true, 
    timestamps: false
  }
);
