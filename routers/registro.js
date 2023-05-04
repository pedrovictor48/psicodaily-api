const mongoose = require("mongoose");
const express = require("express");
const joi = require("joi");
const utils = require("./utils");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const User = require("../models/user");
const Registro = require("../models/registro");

const router = express.Router();

router.get("/registros", utils.validateJWT, async (req, res) => {
    const { userId } = req.body;
    const id = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(id);

    if (user.__t == "Psicologo") {
        return res.status(500).send({ message: "not implemented" });
    }

    const registers = await Registro.find({ pacienteId: user._id });

    return res.status(200).send({ registers });
});

router.post(
    "/registro",
    utils.validator(
        joi.object({
            data: joi.date().required(),
            titulo: joi.string().required().max(50),
            text: joi.string().required(),
        })
    ),
    utils.validateJWT,
    async (req, res) => {
        const { data, titulo, text, userId } = req.body;

        const newRegistro = new Registro({
            data,
            titulo,
            text,
            pacienteId: userId,
        });

        await newRegistro.save();

        return res.status(200).send({ registro: newRegistro });
    }
);

router.delete(
    "/registro",
    utils.validator(
        joi.object({
            registroId: joi.string().required(),
        })
    ),
    utils.validateJWT,
    async (req, res) => {
        const { userId, registroId } = req.body;
        const registro = await Registro.findById(registroId);

        if (!registro || registro.pacienteId != userId) {
            return res.status(404).send({ message: "Registro nao encontrado" });
        }

        await registro.deleteOne();
        return res.sendStatus(200);
    }
);

router.put(
    "/registro",
    utils.validator(
        joi.object({
            registroId: joi.string().required(),
            data: joi.date().required(),
            titulo: joi.string().required().max(50),
            text: joi.string().required(),
        })
    ),
    utils.validateJWT,
    async (req, res) => {
        const { userId, registroId } = req.body;
        const register = await Registro.findById(registroId);
        if (!register || register.pacienteId != userId) {
            return res.status(404).send({ message: "Registro nao encontrado" });
        }

        await register.updateOne({
            data: req.body.data,
            titulo: req.body.titulo,
            text: req.body.text,
        });

        return res.sendStatus(200);
    }
);

module.exports = router;
