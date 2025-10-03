import http from "./http";

export const getProducts = async (search) => {
  try {
    const res = await http.get("/api/products", {
      params: { search_keyword: search },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};
