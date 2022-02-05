const Product = require("../models/product");

const getAddProduct = {};

const postAddProduct = (req, res, next) => {
  // console.log("req", req.body);
  const product = new Product(req.body.title);
  product.save();
  res.status(200).send({ response: "success" });
};

const getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.status(200).send({ products });
};

module.exports = {
  postAddProduct,
  getAddProduct,
  getProducts,
};
