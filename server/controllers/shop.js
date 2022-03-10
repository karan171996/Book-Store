const Product = require("../models/product");
// const Cart = require("../models/cart");

const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      console.log("products shop controller", products);
      res.status(200).send({ products });
    })
    .catch((err) => console.log("err", err));
};

const getProductDetail = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.status(200).send({ product });
    })
    .catch((err) => console.log("err", err));
};

// const postCart = (req, res, next) => {
//   const selectedProductId = req.body.productId;
//   Product.findById(selectedProductId, (product) => {
//     Cart.addProduct(selectedProductId, product.price);
//     res.status(200).send({ response: "Added into cart" });
//   });
// };

// const getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart
//         .getProducts()
//         .then((cartProducts) => {
//           res.status(200).send({ cart: cartProducts });
//         })
//         .catch((err) => {
//           console.log("err", err);
//         });
//     })
//     .catch((err) => console.log("err", err));
// };

// const postCartDeleteProduct = (req, res) => {
//   const prodId = req.body.productId;
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       let newQuantity = 1;
//       if (product) {
//         // Somrthing we need to think
//       }
//       return Product.findByPk(prodId)
//         .then((product) => {
//           return fetchedCart.addProduct(product, {
//             through: { quantity: newQuantity },
//           });
//         })
//         .catch((err) => console.log(err));
//     })
//     .then(() => {
//       res.status(200).send({ response: "success" });
//     })
//     .catch((err) => console.log(err));
// };

module.exports = {
  getProducts,
  getProductDetail,
  // postCart,
  // getCart,
  // postCartDeleteProduct,
};
