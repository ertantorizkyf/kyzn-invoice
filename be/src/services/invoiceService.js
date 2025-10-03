import { sequelize } from "../config/db.js";
import { Invoice } from "../models/invoiceModel.js";
import { InvoiceProduct } from "../models/invoiceProductModel.js";
import { Product } from "../models/productModel.js";
import { Op } from "sequelize";

const createInvoice = async ({ date, customer, salesperson, payment_type, notes, products }) => {
  return sequelize.transaction(async (t) => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, ""); 
    const likePattern = `INV-${todayStr}-%`;

    const count = await Invoice.count({
      where: {
        invoice_no: { [Op.like]: likePattern },
      },
      transaction: t,
    });
    
    const invoiceNo = `INV-${todayStr}-${String(count + 1).padStart(5, "0")}`;

    // 1. Create invoice
    const invoice = await Invoice.create(
      { date, customer, salesperson, payment_type, notes: notes || null, invoice_no: invoiceNo },
      { transaction: t }
    );

    // 2. Prepare invoice items
    const items = [];

    for (const p of products) {
      // Pessimistic lock (FOR UPDATE)
      const product = await Product.findOne({
        where: { id: p.product_id },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });

      if (!product) throw new Error(`Product ID ${p.product_id} not found`);
      if (product.stock < p.qty) throw new Error(`Insufficient stock for ${product.name}`);

      // Deduct stock
      product.stock -= p.qty;
      await product.save({ transaction: t });

      // Construct invoice product
      items.push({
        invoice_id: invoice.id,
        product_id: product.id,
        product_name: product.name,
        qty: p.qty,
        total_cogs: p.qty * parseFloat(product.cogs),
        total_price: p.qty * parseFloat(product.price),
      });
    }

    // Insert invoice products
    await InvoiceProduct.bulkCreate(items, { transaction: t });

    return invoice;
  });
};

/**
 * Fetch invoices with products, totals, and pagination
 * @param {number} page - current page (1-based)
 * @param {number} perPage - items per page
 */
const getInvoicesWithTotalsPaginated = async (page = 1, perPage = 10) => {
  const offset = (page - 1) * perPage;
  const limit = perPage;

  // Fetch invoices with their products
  const { rows: invoices, count: total } = await Invoice.findAndCountAll({
    include: [
      {
        model: InvoiceProduct,
        as: "items",
      },
    ],
    order: [["date", "DESC"]],
    offset,
    limit,
  });

  const mapped = invoices.map((inv) => {
    const total_cogs = inv.items.reduce((sum, item) => sum + parseFloat(item.total_cogs), 0);
    const total_price = inv.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0);

    return {
      id: inv.id,
      invoice_no: inv.invoice_no,
      date: inv.date,
      customer: inv.customer,
      salesperson: inv.salesperson,
      payment_type: inv.payment_type,
      notes: inv.notes || "-",
      total_cogs,
      total_price,
      products: inv.items.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        qty: item.qty,
        total_cogs: parseFloat(item.total_cogs),
        total_price: parseFloat(item.total_price),
      })),
    };
  });

  return {
    data: mapped,
    page,
    per_page: perPage,
    total,
    total_pages: Math.ceil(total / perPage),
  };
};

export { 
  createInvoice,
  getInvoicesWithTotalsPaginated
};
