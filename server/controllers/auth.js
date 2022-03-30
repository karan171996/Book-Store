const crypto = require("crypto");
const bcrypt = require("bcryptjs"); // We used to store the password in database in hash format.
const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

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
        .then(() => {
          return transporter.sendMail({
            to: email,
            from: "krnsngh38@gmail.com",
            subject: "Signup Sucessfully",
            html: "<h1>Signup Sucessfully</>",
          });
        })
        .then((result) => {
          res.status(200).send({ response: result });
        })
        .catch((err) => console.log("SendInBlue error", err));
    })
    .catch((err) => {
      // res.status(500).send({ response: err });
      console.log("Signup Error", err);
    });
};

const postResetPassword = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.status(400).send({ response: "Unable to generate password" });
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res
            .status(500)
            .response({ response: "No account with email found !!!" });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(() => {
        return transporter.sendMail({
          to: req.body.email,
          from: "node-shop@dummy.com",
          subject: "Reset Password Link",
          html: `
        <p> You Requested Password reset</p>
        <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set Password </p>
        `,
        });
      })
      .then(() => {
        res.status(200).send({
          response: "Password link sent successfully to email!!!",
        });
      })
      .catch((err) => {
        console.log("Reset Password Error", err);
      });
  });
};

module.exports = {
  postLogin,
  postLogout,
  postSignup,
  postResetPassword,
};
