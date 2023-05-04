const mongoose = require("mongoose");

const registroSchema = new mongoose.Schema({
    data: Date,
    titulo: String,
    text: String,
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
});

const Registro = mongoose.model("Registro", registroSchema);

module.exports = Registro;
