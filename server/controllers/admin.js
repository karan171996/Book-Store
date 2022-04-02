const Product = require("../models/product");

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.image;
  const product = new Product({
    title: title,
    description: description,
    price: price,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log("unable to add Product", err));
};

const getEditProduct = (req, res, next) => {
  let productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.status(200).send({ product });
    })
    .catch((err) => console.log("Unable to fetch the product for edit", err));
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.image;
  Product.findById(productId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.status(400).send({ response: "User not authrised" });
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save().then(() => {
        res.status(200).send({ response: "success" });
      });
    })
    .catch((err) => console.log("unable to Edit Product", err));
};

const postDeleteProduct = (req, res) => {
  const producId = req.body.productId;

  Product.deleteOne({ _id: producId, userId: req.user._id })
    .then(() => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log("Unable to delete Product", err));
};

const getProducts = (req, res) => {
  Product.find({ userId: req.user._id })
    .then((products) => {
      res.status(200).send({ products });
    })
    .catch((err) => console.log("Unable to get Admin Prducts", err));
};
module.exports = {
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
};
