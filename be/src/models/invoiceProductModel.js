import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Invoice } from "./invoiceModel.js";

export const InvoiceProduct = sequelize.define(
  "InvoiceProduct",
  {
    invoice_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    product_name: { type: DataTypes.STRING, allowNull: false },
    qty: { type: DataTypes.INTEGER, allowNull: false },
    total_cogs: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  { tableName: "invoice_products", timestamps: false }
);

Invoice.hasMany(InvoiceProduct, { foreignKey: "invoice_id", as: "items" });
InvoiceProduct.belongsTo(Invoice, { foreignKey: "invoice_id", as: "invoice" });
