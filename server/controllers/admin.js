const Product = require("../models/product");

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.image;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
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
  let product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    productId
  );
  return product
    .save()
    .then(() => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log("unable to Edit Product", err));
};

const postDeleteProduct = (req, res) => {
  const producId = req.body.productId;
  Product.deleteById(producId)
    .then(() => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log("Unable to delete Product", err));
};

const getProducts = (req, res) => {
  Product.fetchAll()
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
