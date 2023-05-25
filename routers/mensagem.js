require('dotenv').config()
const express = require('express')
const router = express.Router()
const joi = require('joi')

const validateJWT = require('../middleware/validateJWT')
const validator = require('../middleware/joiValidator')

const {
	addMensagem,
	getMensagens,
} = require('../controllers/mensagemController.js')

const postSchema = joi.object({
	receiverId: joi.string().required(),
	text: joi.string().required(),
})

router
	.route('/mensagem')
	.get(validateJWT, getMensagens)
	.post(validator(postSchema), validateJWT, addMensagem)

module.exports = router
