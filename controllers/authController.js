const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");
const Paciente = require("../models/paciente");
const Psicologo = require("../models/psicologo");

const login = async (req, res) => {
  const body = req.body;

  const candidate = await User.findOne({ email: body.email });
  if (!candidate) return res.sendStatus(401);

  if (await bcrypt.compare(body.password, candidate.password)) {
    const token = jwt.sign({ userId: candidate._id }, process.env.SECRET, {
      expiresIn: 30000,
    });
    return res.status(200).send({ token, type: candidate.__t });
  } else {
    res.sendStatus(401);
  }
};

const registerPac = async (req, res) => {
  const body = req.body;

  const hash = await bcrypt.hash(body.password, 10);

  const newUser = new Paciente({
    name: body.name,
    email: body.email,
    password: hash,
    cpf: body.cpf,
  });

  await newUser.save();

  res.status(400).send({ message: "Usuario criado com sucesso" });
};

const registerPsic = async (req, res) => {
  const body = req.body;
  const sameEmail = await User.findOne({ email: body.email });

  if (sameEmail) {
    res.status(409).send({ message: "Email ja cadastrado" });
    return;
  }

  const hash = await bcrypt.hash(body.password, 10);

  const newUser = new Psicologo({
    name: body.name,
    email: body.email,
    password: hash,
    cpf: body.cpf,
    crp: body.crp,
  });

  await newUser.save();

  res.status(400).send({ message: "Usuario criado com sucesso" });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).send({ users });
};

module.exports = { login, registerPac, registerPsic, getAllUsers };
