module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res
      .status(500)
      .send({ response: "Not loggedIn", isLoggedIn: false });
  } else {
    next();
  }
};
