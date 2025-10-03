import express from "express";
import { getRevenueController } from "../controllers/revenueController.js";

const router = express.Router();

// Get revenue grouped by period (daily, weekly, monthly)
router.get("/", getRevenueController);

export default router;
