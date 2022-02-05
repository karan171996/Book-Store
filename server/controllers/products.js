const Product = require("../models/product");

const getAddProduct = {};

const postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.status(200).send({ response: "success" });
};

const getProducts = (req, res, next) => {
  Product.fetchAll((val) => {
    res.status(200).send({ products: val });
  });
};

module.exports = {
  postAddProduct,
  getAddProduct,
  getProducts,
};
