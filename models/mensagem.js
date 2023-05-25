const mongoose = require('mongoose')

const mensagemSchema = new mongoose.Schema({
	pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
	psicologoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Psicologo' },
	text: String,
})

const Mensagem = mongoose.model('Notificacao', notifSchema)

module.exports = Mensagem
