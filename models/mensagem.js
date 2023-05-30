const mongoose = require('mongoose')

const mensagemSchema = new mongoose.Schema({
	pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente' },
	psicologoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Psicologo' },
	text: String,
	senderName: String,
})

const Mensagem = mongoose.model('Mensagem', mensagemSchema)

module.exports = Mensagem
