const Product = require("../models/product");
const Order = require("../models/order");

const getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log("products shop controller", products);
      res.status(200).send({ products });
    })
    .catch((err) => console.log("Unable to get Products", err));
};

const getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.status(200).send({ product });
    })
    .catch((err) => console.log("Product Detail error", err));
};

const postCart = (req, res, next) => {
  const selectedProductId = req.body.productId;
  Product.findById(selectedProductId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.status(200).send({ response: "Added into cart" });
    })
    .catch((err) => console.log("post cart error", err));
};

const getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.status(200).send({ cart: products });
    })
    .catch((err) => console.log("Unable to getCart", err));
};

const postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(() => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log("Unable to delete Cart Product", err));
};

const postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        console.log("i", i);
        return {
          qty: i.qty,
          product: { ...i.productId },
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.status(200).send({ response: "success" });
    })
    .catch((err) => console.log("Unable to Post Order", err));
};

const getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.status(200).send({ orders });
    })
    .catch((err) => console.log("Get Order orders", err));
};

module.exports = {
  getProducts,
  getProductDetail,
  postCart,
  getCart,
  postCartDeleteProduct,
  postOrder,
  getOrders,
};
