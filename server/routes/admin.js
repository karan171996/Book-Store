const express = require("express");

const router = express.Router();

router.post("/products", (req, res, next) => {
  // console.log("req", req.body);
  res.status(200).send({ res: "success" });
});

module.exports = router;
