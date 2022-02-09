const Product = require("../models/product");

const getProducts = (req, res, next) => {
  Product.fetchAll((val) => {
    res.status(200).send({ products: val });
  });
};

const getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  Product.fetchAll((val) => {
    const product = val.find((item) => item.id === productId) || {};
    res.status(200).send({ product });
  });
};

const postCart = (req, res, next) => {
  const selectedProduct = req.body;
  console.log(selectedProduct);
};

module.exports = {
  getProducts,
  getProductDetail,
  postCart,
};
