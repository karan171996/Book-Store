const Product = require("../models/product");

const getProducts = (req, res, next) => {
  Product.fetchAll((val) => {
    res.status(200).send({ products: val });
  });
};

module.exports = {
  getProducts,
};
