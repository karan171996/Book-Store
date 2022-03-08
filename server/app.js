const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const mongoConnect = require("./util/database");
// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // Important to fetch the json while sending through form

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user; // here user is sequelize object
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log("err");
  //   });
});

// app.use("/api/admin", adminRoutes);

// app.use("/api/shops", shopRoutes);

mongoConnect((client) => {
  console.log("client", client);
  app.listen(6000);
});
