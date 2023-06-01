const User = require('../models/user')
const Notificacao = require('../models/notif')

const getNotifs = async (req, res) => {
	try {
		const { userId } = req.body

		const notifs = await Notificacao.find({
			$or: [{ pacienteId: userId }, { psicologoId: userId }],
		})

		let arr = []
		for (let i in notifs) {
			const psic = await User.findById(notifs[i].psicologoId)
			arr.push({ ...notifs[i]._doc, psicologoNome: psic.name })
		}

		res.status(200).send(arr)
	} catch {
		return res.sendStatus(500)
	}
}

const addNotif = async (req, res) => {
	try {
		const { userId, pacEmail } = req.body
		const user = await User.findById(userId)
		if (user.__t != 'Psicologo') return res.sendStatus(403)

		const paciente = await User.findOne({ email: pacEmail })

		if (!paciente) res.sendStatus(400)

		const newNotif = new Notificacao({
			pacienteId: paciente._id,
			psicologoId: userId,
		})

		await newNotif.save()
		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

const deleteNotif = async (req, res) => {
	try {
		const { userId } = req.body
		const { notifId } = req.params

		await Notificacao.findOneAndDelete({
			$or: [
				{ _id: notifId, pacienteId: userId },
				{ _id: notifId, psicologoId: userId },
			],
		})

		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

const accept = async (req, res) => {
	try {
		const { userId, notifId } = req.body

		const user = await User.findById(userId)
		if (user.__t != 'Paciente') return res.sendStatus(403)

		const notif = await Notificacao.findOne({
			_id: notifId,
			pacienteId: userId,
		})

		if (!notif) return res.sendStatus(403)

		await user.updateOne({ psic_id: notif.psicologoId })

		await notif.deleteOne()

		return res.sendStatus(200)
	} catch {
		return res.sendStatus(500)
	}
}

module.exports = { getNotifs, addNotif, deleteNotif, accept }
