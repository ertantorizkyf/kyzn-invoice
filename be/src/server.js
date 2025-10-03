// be/src/server.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import revenueRoutes from "./routes/revenueRoutes.js";

// Load env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const FE_ORIGIN = process.env.FE_ORIGIN || "http://localhost:5051";

// Middleware
app.use(
  cors({
    origin: FE_ORIGIN,
    credentials: false,
  })
);
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/revenues", revenueRoutes)

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});