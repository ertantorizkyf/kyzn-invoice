import { createInvoice, getInvoicesWithTotalsPaginated } from "../services/invoiceService.js";

const createInvoiceController = async (req, res) => {
  const { date, customer, salesperson, payment_type, notes, products } = req.body;

  if (!date || !customer || !salesperson || !payment_type || !products || !products.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const invoice = await createInvoice({ date, customer, salesperson, payment_type, notes, products });
    return res.status(201).json({ message: "Invoice created successfully", invoice_id: invoice.id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getInvoicesController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const per_page = parseInt(req.query.per_page) || 10;

  try {
    const result = await getInvoicesWithTotalsPaginated(page, per_page);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { 
  createInvoiceController,
  getInvoicesController
};
