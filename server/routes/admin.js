const express = require("express");
const adminController = require("../controllers/admin");
const isAuth = require("../middelware/isAuth");
const router = express.Router();

router.post("/add-products", isAuth, adminController.postAddProduct);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);
router.get("/products", isAuth, adminController.getProducts);
module.exports = router;
