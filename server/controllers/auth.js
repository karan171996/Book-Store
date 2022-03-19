const User = require("../models/user");

const getLogin = (req, res, next) => {
  //   res.status(200).send({ response: "login" });
};

const postLogin = (req, res, next) => {
  // res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");

  User.findById("622ca4a49c8880ba6276e4f1")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.status(200).send({ response: "login" });
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

module.exports = {
  getLogin,
  postLogin,
  postLogout,
};
