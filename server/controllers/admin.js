const Product = require("../models/product");

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.image;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.status(200).send({ response: "success" });
};

module.exports = {
  postAddProduct,
};
