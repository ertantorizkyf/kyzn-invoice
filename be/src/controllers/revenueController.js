import { getRevenueByPeriod } from "../services/revenueService.js";

/**
 * GET /api/revenue?period=daily|weekly|monthly
 */
const getRevenueController = async (req, res) => {
  const periodMap = {
    daily: "day",
    weekly: "week",
    monthly: "month",
  };

  const period = periodMap[req.query.period] || "day";

  try {
    const data = await getRevenueByPeriod(period);
    res.json({ period, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export { getRevenueController };
