import { getAllProducts } from "../services/productService.js";

async function getAllProductsController(req, res, next) {
  try {
    const { search_keyword } = req.query;

    const products = await getAllProducts(search_keyword);
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export { getAllProductsController };
