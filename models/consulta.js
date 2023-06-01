const mongoose = require("mongoose");

const consultaSchema = mongoose.Schema({
    startDate: Date,
    pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
    psicologoId: { type: mongoose.Schema.Types.ObjectId, ref: "Psicologo" },
	desc: String
});

const Consulta = mongoose.model("Consulta", consultaSchema);

module.exports = Consulta;
