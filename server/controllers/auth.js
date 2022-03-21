const bcrypt = require("bcryptjs");
const User = require("../models/user");

const getLogin = (req, res, next) => {
  //   res.status(200).send({ response: "login" });
};

const postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(400).send({ response: "User not exists" });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((resultMatch) => {
            if (resultMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(() => {
                res.status(200).send({ response: "login" });
              });
            }
            res.status(400).send({ response: "User enter Invalid Password" });
          })
          .catch((err) => {
            conso.log("Error in password matching", err);
          });
      }
    })
    .catch((err) => {
      console.log("err");
    });
};

const postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.status(200).send({ response: "logout" });
  });
};

const postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  console.log("email", email, password, confirmPassword);
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.status(400).send({ response: "User already Exists!!" });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
          const user = new User({
            email: email,
            password: hashPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.status(200).send({ response: result });
        });
    })
    .catch((err) => {
      // res.status(500).send({ response: err });
      console.log("Signup Error", err);
    });
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  postSignup,
};
