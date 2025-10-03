import { InvoiceProduct } from "../models/invoiceProductModel.js";
import { Invoice } from "../models/invoiceModel.js";
import { fn, col, literal } from "sequelize";

/**
 * Helper: Generate revenue grouped by day/week/month
 */
const getRevenueByPeriod = async (period = "day") => {
  let groupBy;
  switch (period) {
    case "day":
      groupBy = fn("DATE", col("invoice.date"));
      break;
    case "week":
      groupBy = fn("YEARWEEK", col("invoice.date")); // MySQL: YYYYWW
      break;
    case "month":
      groupBy = fn("DATE_FORMAT", col("invoice.date"), "%Y-%m"); // YYYY-MM
      break;
    default:
      groupBy = fn("DATE", col("invoice.date"));
  }

  const revenues = await InvoiceProduct.findAll({
    attributes: [
      [groupBy, "period"],
      [fn("SUM", col("total_price")), "total_revenue"]
    ],
    include: [
      {
        model: Invoice,
        as: "invoice",
        attributes: [], // we just need date
      },
    ],
    group: ["period"],
    order: [["period", "ASC"]],
    raw: true,
  });

  return revenues;
};

export { getRevenueByPeriod };
