const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send({ form: "form" });
});

router.post("/products", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
