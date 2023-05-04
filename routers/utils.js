const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const User = require("../models/user");
const Paciente = require("../models/paciente");
const Registro = require("../models/registro");
const Psicologo = require("../models/psicologo");

const validator = (joiSchema) => (req, res, next) => {
    console.log(req.body);
    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(406).send({ message: error });
    else next();
};

const duplicatedEmail = async (req, res, next) => {
    const { email } = req.body;
    const candidate = await User.findOne({ email: email });
    if (candidate) {
        return res.status(409).send({ message: "Email ja cadastrado" });
    }
    return next();
};

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

module.exports = { validator, duplicatedEmail, validateJWT };
