const Product = require("../models/product");

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.image;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res, next) => {
  let productId = req.params.productId;
  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      res.status(200).send({ product });
    })
    .catch((err) => console.log("error"));
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.image;
  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(() => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = (req, res) => {
  const producId = req.body.productId;
  Product.findByPk(producId)
    .then((product) => product.destroy())
    .then(() => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log("err", err));
};

const getProducts = (req, res) => {
  req.user.getProducts((products) => {
    res.status(200).send({ products });
  });
};
module.exports = {
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
};
