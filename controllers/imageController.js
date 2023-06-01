const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')

const router = express.Router()

const multerStorage = multer.memoryStorage()
const upload = multer({ storage: multerStorage })

const validateJWT = require('../middleware/validateJWT')
const User = require('../models/user')

const imageSchema = mongoose.Schema(
	{
		image: { data: Buffer, contentType: String },
	},
	{ timestamps: true }
)

const ImageModel = mongoose.model('images', imageSchema)

router.post(
	'/upload',
	validateJWT,
	upload.single('image'),
	async (req, res, next) => {
		const { userId } = req.body
		const image = {
			data: new Buffer.from(req.file.buffer, 'base64'),
			contentType: req.file.mimetype,
		}
		const savedImage = await ImageModel.create(image)

		//setar
		await User.findOneAndUpdate({ _id: userId }, { photo: savedImage._id })
		res.send(savedImage)
	}
)

router.get('/getImage', validateJWT, async (req, res, next) => {
	const { userId } = req.body
	const user = await User.findById(userId)
	const imgId = user.photo
	// If you dont use lean(), you wont decode image as base64
	const image = await ImageModel.findOne({ _id: imgId }).lean().exec()
	res.send(image)
})

module.exports = router
