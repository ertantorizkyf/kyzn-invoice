import http from "./http";

export const getInvoices = async (page = 1, per_page = 10) => {
  try {
    const res = await http.get("/api/invoices", {
      params: { page, per_page, _: Date.now() }, // cache buster
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching invoices:", err);
    throw err;
  }
};

export const createInvoice = async (payload) => {
  try {
    const res = await http.post("/api/invoices", payload);
    return res.data;
  } catch (err) {
    console.error("Error creating invoice:", err);
    throw err;
  }
};
