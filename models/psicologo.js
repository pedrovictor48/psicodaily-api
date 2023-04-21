const mongoose = require("mongoose");
const User = require("./user");

const psicologoSchema = new mongoose.Schema({
    crp: Sring,
});

const Psicologo = User.discriminator("Psicologo", psicologoSchema);

module.exports = Psicologo;
