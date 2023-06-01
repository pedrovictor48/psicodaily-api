const Consulta = require('../models/consulta')
const User = require('../models/user')

const getConsultas = async (req, res) => {
	try {
		const { userId } = req.body
		const consultas = await Consulta.find({
			$or: [{ pacienteId: userId }, { psicologoId: userId }],
		})
		return res.status(200).send(consultas)
	} catch {
		return res.sendStatus(500)
	}
}

const addConsulta = async (req, res) => {
	try {
		const { startDate, userId, pacId } = req.body

		const user = await User.findOne({ _id: userId })

		if (user.__t == 'Paciente') {
			return res.sendStatus(403)
		}

		const newConsulta = new Consulta({
			startDate,
			pacienteId: pacId,
			psicologoId: user._id,
		})

		await newConsulta.save()
		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

const editConsulta = async (req, res) => {
	try {
		const { startDate, userId, consultaId, pacId } = req.body

		const user = await User.findOne({ _id: userId })

		if (user.__t == 'Paciente') {
			return res.sendStatus(403)
		}

		await Consulta.findOneAndUpdate(
			{ _id: consultaId },
			{
				startDate,
				pacienteId: pacId,
				psicologoId: user._id,
			}
		)
		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

const deleteConsulta = async (req, res) => {
	try {
		const { userId } = req.body
		const {consultaId} = req.params

		if(!consultaId) return res.sendStatus(400)

		await Consulta.findOneAndDelete({
			$or: [
				{ _id: consultaId, pacienteId: userId },
				{ _id: consultaId, psicologoId: userId },
			],
		})

		res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

module.exports = { deleteConsulta, editConsulta, addConsulta, getConsultas }
