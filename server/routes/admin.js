const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.post("/add-products", adminController.postAddProduct);

router.get("/products");
module.exports = router;
