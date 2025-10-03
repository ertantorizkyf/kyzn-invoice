import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "kyzn_invoice",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql"
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected:", sequelize.config.database);
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
})();

export { sequelize };
