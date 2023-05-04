const mongoose = require("mongoose");
const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const utils = require("./utils");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const User = require("../models/user");
const Paciente = require("../models/paciente");
const Psicologo = require("../models/psicologo");

const router = express.Router();

router.post(
    "/login",
    utils.validator(
        joi.object({
            email: joi.string().required().max(50),
            password: joi.string().required().max(50),
        })
    ),
    async (req, res) => {
        const body = req.body;

        const candidate = await User.findOne({ email: body.email });
        if (!candidate)
            return res.status(401).send({ message: "Email nao cadastrado" });

        if (await bcrypt.compare(body.password, candidate.password)) {
            const token = jwt.sign(
                { userId: candidate._id },
                process.env.SECRET,
                {
                    expiresIn: 30000,
                }
            );
            return res.status(200).send({ token, type: candidate.__t });
        } else {
            res.status(401).send({ message: "Credenciais invalidas" });
        }
    }
);

router.post(
    "/pac_register",
    utils.validator(
        joi.object({
            name: joi.string().required().max(100),
            email: joi.string().required().max(100),
            password: joi.string().required().max(20),
            cpf: joi.string().required().length(11),
        })
    ),
    utils.duplicatedEmail,
    async (req, res) => {
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
    }
);

router.post(
    "/psic_register",
    utils.validator(
        joi.object({
            name: joi.string().required().max(100),
            email: joi.string().required().max(100),
            password: joi.string().required().max(20),
            cpf: joi.string().required().length(11),
            crp: joi.string().required(),
        })
    ),
    utils.duplicatedEmail,
    async (req, res) => {
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
    }
);

router.get("/users", async (req, res) => {
    const users = await User.find({});

    res.status(200).send({ users });
});

module.exports = router;
