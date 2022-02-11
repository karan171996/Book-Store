const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.post("/add-products", adminController.postAddProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);
router.get("/products");
module.exports = router;
