// this for user viewing
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send({ form: "shop" });
});

module.exports = router;
