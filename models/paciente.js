const mongoose = require("mongoose");
const User = require("./user");

const pacienteSchema = new mongoose.Schema({
    psic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Psicologo" },
});

const Paciente = User.discriminator("Paciente", pacienteSchema);

module.exports = Paciente;
