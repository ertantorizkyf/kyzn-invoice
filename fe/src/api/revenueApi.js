import http from "./http";

export const getRevenue = async (period) => {
  try {
    const res = await http.get("/api/revenues", {
      params: { period }, // daily, weekly, monthly
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching revenue:", err);
    throw err;
  }
};
