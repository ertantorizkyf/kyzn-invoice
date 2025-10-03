import { Product } from "../models/productModel.js";
import { Op } from "sequelize";

const getAllProducts = async (searchKeyword) => {
  const whereClause = searchKeyword
    ? { name: { [Op.like]: `%${searchKeyword}%` } }
    : {};

  return Product.findAll({ where: whereClause });
};

export {
  getAllProducts
};
