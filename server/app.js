const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");

const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // Important to fetch the json while sending through form

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; // here user is sequelize object
      next();
    })
    .catch((err) => {
      console.log("err");
    });
});

app.use("/api/admin", adminRoutes);

app.use("/api/shops", shopRoutes);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  //   .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1).then();
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "max@dummy.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then((cart) => {
    app.listen(6000);
  })
  .catch((err) => {
    console.log("err", err);
  });
