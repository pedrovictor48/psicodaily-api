const User = require("../models/user")
const bcrypt = require("bcrypt")

const getUserInfo = async (req, res) => {
	const {userId} = req.body

	const user = await User.findOne({_id: userId}).select('name email cpf psic_id')

	console.log(user)

	return res.status(200).send(user)
}

const updateUser = async (req, res) => {
	const {userId, newName, newEmail, cpf} = req.body

	console.log("a")
	console.log(req.body)

	const user = await User.findOneAndUpdate({_id: userId},
		{name: newName, email: newEmail, cpf}
	)


	res.sendStatus(200)
}

const changePassword = async (req, res) => {
	const {userId, password, newPassword} = req.body
	console.log(newPassword)

	const user = await User.findById(userId)
	
	if(await bcrypt.compare(password, user.password)) {
		const hash = await bcrypt.hash(newPassword, 10);
		await user.updateOne({password: hash})
		return res.sendStatus(200)
	}
	else {
		return res.sendStatus(403)
	}
}

module.exports = {getUserInfo, updateUser, changePassword}