const Product = require("../models/product");
const Cart = require("../models/cart");

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
  const selectedProductId = req.body.productId;
  Product.findById(selectedProductId, (product) => {
    Cart.addProduct(selectedProductId, product.price);
    res.status(200).send({ response: "Added into cart" });
  });
};

const getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (item) => item.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productsData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.status(200).send({ cart: cartProducts });
    });
  });
};

const postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.status(200).send({ response: "success" });
  });
};

module.exports = {
  getProducts,
  getProductDetail,
  postCart,
  getCart,
  postCartDeleteProduct,
};
