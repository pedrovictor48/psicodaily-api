const mongoose = require("mongoose");
const express = require("express");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

mongoose.connect(process.env.MONGO);

const User = require("./models/user");
const Paciente = require("./models/paciente");
const Registro = require("./models/registro");
const Psicologo = require("./models/psicologo");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const registro = require("./routers/registro");
const auth = require("./routers/auth");

app.use(registro);
app.use(auth);

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
