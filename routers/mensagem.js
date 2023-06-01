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
	data: joi.date()
})

router
	.route('/mensagem')
	.post(validator(postSchema), validateJWT, addMensagem)

router.get('/mensagem/:pacienteId?', validateJWT, getMensagens)

module.exports = router
