const User = require('../models/user')
const Registro = require('../models/registro')
const Paciente = require('../models/paciente')

const getRegistro = async (req, res) => {
	try {
		const { userId } = req.body

		const user = await User.findOne({ _id: userId })

		if (user.__t == 'Psicologo') {
			const { pacienteId } = req.params
			if (!pacienteId) return res.sendStatus(400)
			const candidate = await Paciente.findOne({
				psic_id: userId,
				_id: pacienteId,
			})

			if (!candidate) return res.sendStatus(403)

			const consultas = await Registro.find({ pacienteId })
			return res.status(200).send(consultas)
		}

		const registers = await Registro.find({ pacienteId: user._id })

		return res.status(200).send({ registers })
	} catch {
		return res.sendStatus(500)
	}
}

const convertTZ = require("../utils/time")

const postRegistro = async (req, res) => {
	try {
		const { data, titulo, text, userId } = req.body
		const newDate = new Date()
		const convertedDate = convertTZ(date, "America/Sao_Paulo")

		const newRegistro = new Registro({
			data: convertedDate,
			titulo,
			text,
			pacienteId: userId,
		})

		await newRegistro.save()

		return res.status(200).send({ registro: newRegistro })
	} catch {
		return res.sendStatus(500)
	}
}

const deleteRegistro = async (req, res) => {
	try {
		const { userId } = req.body
		const { registroId } = req.params
		const registro = await Registro.findById(registroId)

		if (!registro || registro.pacienteId != userId) {
			return res.status(404).send({ message: 'Registro nao encontrado' })
		}

		await registro.deleteOne()
		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

const editRegistro = async (req, res) => {
	try {
		const { userId, registroId } = req.body
		const register = await Registro.findById(registroId)
		if (!register || register.pacienteId != userId) {
			return res.status(404).send({ message: 'Registro nao encontrado' })
		}

		await register.updateOne({
			data: req.body.data,
			titulo: req.body.titulo,
			text: req.body.text,
		})

		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

module.exports = {
	getRegistro,
	postRegistro,
	deleteRegistro,
	editRegistro,
}
