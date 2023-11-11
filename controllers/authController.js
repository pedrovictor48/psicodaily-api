const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user");
const Paciente = require("../models/paciente");
const Psicologo = require("../models/psicologo");

const login = async (req, res) => {
  try {
    const body = req.body;

    console.log("entrou rota", req.body);

    const candidate = await User.findOne({ email: body.email });
    if (!candidate) {
      return res.sendStatus(401);
    }

    if (bcrypt.compare(body.password, candidate.password)) {
      const token = jwt.sign(
        {
          userId: candidate._id,
          name: candidate.name,
          email: candidate.email,
        },
        process.env.SECRET,
        {
          expiresIn: 30000,
        }
      );
      return res.status(200).send({ token, type: candidate.__t });
    } else {
      res.sendStatus(401);
    }
  } catch {
    return res.sendStatus(500);
  }
};

const registerPac = async (req, res) => {
  try {
    const body = req.body;

    const hash = await bcrypt.hash(body.password, 10);

    const newUser = new Paciente({
      name: body.name,
      email: body.email,
      password: hash,
      cpf: body.cpf,
    });

    console.log("chegou ate aqui");

    await newUser.save();

    res.status(200).send({ message: "Usuario criado com sucesso" });
  } catch {
    res.sendStatus(500);
  }
};

const registerPsic = async (req, res) => {
  try {
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

    res.status(200).send({ message: "Usuario criado com sucesso" });
  } catch {
    return res.sendStatus(500);
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.status(200).send({ users });
};

const getUserInfo = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  res.status(200).send({ name, email });
};
module.exports = { login, registerPac, registerPsic, getAllUsers, getUserInfo };
