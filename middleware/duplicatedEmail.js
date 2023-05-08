const User = require("../models/user");

const duplicatedEmail = async (req, res, next) => {
  const { email } = req.body;
  const candidate = await User.findOne({ email: email });
  if (candidate) {
    return res.status(409).send({ message: "Email ja cadastrado" });
  }
  return next();
};

module.exports = duplicatedEmail;
