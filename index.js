const mongoose = require("mongoose");
const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const User = require("./models/user");
const Paciente = require("./models/paciente");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// joi validator para body das requests
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
        return res.status(409).message({ message: "Email ja cadastrado" });
    }
    return next();
};

app.post(
    "/login",
    validator(
        joi.object({
            email: joi.string().required().max(50),
            password: joi.string().required().max(50),
        })
    ),
    async (req, res) => {
        const body = req.body;

        if (bcrypt.compare(body.password, candidate.password)) {
            const token = jwt.sign(
                { userId: candidate._id },
                { expiresIn: 30000 }
            );
            res.status(200).send({ token });
        } else {
            res.send({ message: "Senha incorreta" });
        }
    }
);

app.post(
    "/pac_register",
    validator(
        joi.object({
            name: joi.string().required().max(100),
            email: joi.string().required().max(100),
            password: joi.string().required().max(20),
            cpf: joi.string().required().length(11),
        })
    ),
    duplicatedEmail,
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

app.post(
    "/psic_register",
    validator(
        joi.object({
            name: joi.string().required().max(100),
            email: joi.string().required().max(100),
            password: joi.string().required().max(20),
            cpf: joi.string().required().length(11),
            crp: joi.string().required(),
        })
    ),
    duplicatedEmail,
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

app.get("/users", async (req, res) => {
    const users = await User.find({});

    res.status(400).send({ users });
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
