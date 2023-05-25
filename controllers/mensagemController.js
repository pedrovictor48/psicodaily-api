const Mensagem = require('../models/mensagem')
const User = require('../models/user')

const getMensagens = async (req, res) => {
	const { userId } = req.body

	const mensagens = await Mensagem.find({
		$or: [{ pacienteId: userId }, { psicologoId: userId }],
	})

	res.status(200).send(mensagens)
}

const addMensagem = async (req, res) => {
	const {userId, receiverId, text} = req.body
	const user = await User.findById(userId)
	if(!user || user.__t != 'Psicologo') return res.sendStatus(403)

	const mensagem = new Mensagem({
		psicologoId: userId,
		pacienteId: receiverId,
		text
	})
	await mensagem.save()
}

module.exports = {getMensagens, addMensagem}
