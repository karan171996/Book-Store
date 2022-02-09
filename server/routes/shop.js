const express = require("express");
const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getProducts);

router.get("/products");

router.get("/products/:productId", shopController.getProductDetail);

router.post("/cart", shopController.postCart);

router.get("/checkout");

module.exports = router;
