const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const validateJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ message: "Usuario nao logado" });
  }

  const decoded = jwt.verify(token, process.env.SECRET);
  if (!decoded) {
    return res.status(401).send({ message: "Usuario nao logado" });
  }

  req.body.userId = decoded.userId;
  return next();
};

module.exports = validateJWT;
