import express from "express";
import { createInvoiceController, getInvoicesController } from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getInvoicesController)
router.post("/", createInvoiceController);

export default router;
