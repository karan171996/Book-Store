const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoConnect = require("./util/database").mongoConnect;
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // Important to fetch the json while sending through form

app.use((req, res, next) => {
  User.findById("622a3959937a0623d812807c")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id); // here user is sequelize object
      next();
    })
    .catch((err) => {
      console.log("err");
    });
});

app.use("/api/admin", adminRoutes);

app.use("/api/shops", shopRoutes);

mongoConnect(() => {
  app.listen(6000);
});
