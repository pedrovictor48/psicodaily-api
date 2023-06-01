const mongoose = require("mongoose");
const dateBr = require('../utils/time')

const registroSchema = new mongoose.Schema({
    data: Date,
    titulo: String,
    text: String,
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
	data: {type: Date, default: dateBr}
});

const Registro = mongoose.model("Registro", registroSchema);

module.exports = Registro;
