const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
    psicologoId: { type: mongoose.Schema.Types.ObjectId, ref: "Psicologo" },
})

const Notificacao = mongoose.model("Notificacao", notifSchema);

module.exports = Notificacao
