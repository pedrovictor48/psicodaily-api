const Consulta = require("../models/consulta")
const User = require("../models/user")

const getConsultas = async (req, res) => {
	const {userId} = req.body
	const consultas = await Consulta.find({
		$or:  [
			{pacienteId: userId},
			{psicologoId: userId}
		]
	})
	return res.status(200).send(consultas)
}

const addConsulta = async (req, res) => {
	const {startDate, userId, pacId} = req.body;
	
	const user = await User.findOne({_id: userId})
	
	if(user.__t == "Paciente") {
		return res.sendStatus(403)
	}

	const newConsulta = new Consulta({
		startDate,
		pacienteId: pacId,
		psicologoId: user._id,
	})

	await newConsulta.save()
	return res.sendStatus(200)
}

const editConsulta = async (req, res) => {
	const {startDate, userId, consultaId, pacId} = req.body;
	
	const user = await User.findOne({_id: userId})
	
	if(user.__t == "Paciente") {
		return res.sendStatus(403)
	}
	
	await Consulta.findOneAndUpdate({_id: consultaId}, 
		{
			startDate,
			pacienteId: pacId,
			psicologoId: user._id,
		}
	)
	return res.sendStatus(200)
}

const deleteConsulta = async (req, res) => {
	const {userId, consultaId} = req.body 
	
	const consulta = await Consulta.findOneAndDelete({
		$or: [
			{_id: consultaId, pacienteId: userId},
			{_id: consultaId, psicologoId: userId},
		]
	})

	res.sendStatus(200)
}

module.exports = {deleteConsulta, editConsulta, addConsulta, getConsultas}
