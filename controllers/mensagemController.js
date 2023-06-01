const Mensagem = require('../models/mensagem')
const User = require('../models/user')
const Paciente = require('../models/paciente')

const getMensagens = async (req, res) => {
	try {
		const { userId } = req.body
		const { pacienteId } = req.params

		const user = await User.findById(userId)

		if (user.__t == 'Psicologo') {
			if (!pacienteId) return res.sendStatus(403)
			const candidate = await Paciente.findOne({
				_id: pacienteId,
				psic_id: userId,
			})

			if (!candidate) return res.sendStatus(403)

			const messages = await Mensagem.find({
				psicologoId: userId,
				pacienteId: pacienteId,
			})
			return res.status(200).send(messages)
		} else {
			const messages = await Mensagem.find({
				pacienteId: userId,
				psicologoId: user.psic_id,
			})
			return res.status(200).send(messages)
		}
	} catch {
		res.sendStatus(500)
	}
}

const addMensagem = async (req, res) => {
	try {
		const { userId, receiverId, text, data } = req.body
		const user = await User.findById(userId)
		if (!user || user.__t != 'Psicologo') return res.sendStatus(403)

		const candidate = await User.find({ _id: receiverId, psic_id: userId })
		if (!candidate) return res.sendStatus(403)

		const mensagem = new Mensagem({
			psicologoId: userId,
			pacienteId: receiverId,
			text,
			senderName: user.name,
			data: convertedDate,
		})
		await mensagem.save()
		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

module.exports = { getMensagens, addMensagem }
