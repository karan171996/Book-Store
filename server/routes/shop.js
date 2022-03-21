const express = require("express");
const shopController = require("../controllers/shop");
const isAuth = require("../middelware/isAuth");
const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/products/:productId", shopController.getProductDetail);

router.post("/cart", isAuth, shopController.postCart);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

router.get("/orders", isAuth, shopController.getOrders);

module.exports = router;
