import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Invoice = sequelize.define(
  "Invoice",
  {
    invoice_no: { type: DataTypes.STRING, allowNull: false, unique: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    customer: { type: DataTypes.STRING, allowNull: false },
    salesperson: { type: DataTypes.STRING, allowNull: false },
    payment_type: { type: DataTypes.ENUM("CASH", "CREDIT", "NOTCASHORCREDIT"), allowNull: false },
    notes: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "invoices", timestamps: false }
);
