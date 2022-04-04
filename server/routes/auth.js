const express = require("express");
const { check, body } = require("express-validator/check");
const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter the valid Email Address")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject(
              "User does not exists , please enter valid email!!"
            );
          }
        });
      }),
    body(
      "password",
      "Please enter valid password with text and number with atleast 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogout);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid Email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already Exists!!");
          }
        });
      }),
    body(
      "password",
      "Please enter valid password with text and number with atleast 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password need to be match!!!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/reset-password", authController.postResetPassword);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
