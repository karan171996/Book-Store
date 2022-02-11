const Product = require("../models/product");

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.image;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.status(200).send({ response: "success" });
};

const getEditProduct = (req, res, next) => {
  let productId = req.params.productId;
  Product.findById(productId, (product) => {
    res.status(200).send({ product });
  });
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.image;
  const product = new Product(productId, title, imageUrl, description, price);
  product.save();
  res.status(200).send({ response: "success" });
};

module.exports = {
  postAddProduct,
  getEditProduct,
  postEditProduct,
};
