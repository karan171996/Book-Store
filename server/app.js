const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const app = express();
dotenv.config();

const MONGODB_URI = `mongodb+srv://karan171996:${encodeURIComponent(
  process.env.MONGODB_PASSWORD
)}@cluster0.ilaku.mongodb.net/shop?retryWrites=true&w=majority`;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); // Important to fetch the json while sending through form
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("err");
    });
});

app.get("/api/getCSRFToken", (req, res, next) => {
  req.session.isLoggedIn = true;
  res.json({ CSRFToken: req.csrfToken() });
  next();
});

app.use("/api/admin", adminRoutes);

app.use("/api/shops", shopRoutes);

app.use("/api/auth", authRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(6000);
  })
  .catch((err) => console.log("Mongo Connection err", err));
