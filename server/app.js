const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // Important to fetch the json while sending through form

app.use((req, res, next) => {
  User.findById("622ca4a49c8880ba6276e4f1")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("err");
    });
});

app.use("/api/admin", adminRoutes);

app.use("/api/shops", shopRoutes);

mongoose
  .connect(
    `mongodb+srv://karan171996:${encodeURIComponent(
      process.env.MONGODB_PASSWORD
    )}@cluster0.ilaku.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected!!!");
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Karan",
          email: "random@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(6000);
  })
  .catch((err) => console.log("Mongo Connection err", err));
