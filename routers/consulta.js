const express = require('express')
const router = express.Router()

const validateJWT = require('../middleware/validateJWT')
const validator = require('../middleware/joiValidator')

//middlewares
const {
	getConsultas,
	deleteConsulta,
	editConsulta,
	addConsulta,
} = require('../controllers/consultaController')

//schemas
const {
	postConsultaSchema,
	deleteConsultaSchema,
	putConsultaSchema,
} = require('../utils/schemas')

router
	.route('/consulta')
	.post(validator(postConsultaSchema), validateJWT, addConsulta)
	.put(validator(putConsultaSchema), validateJWT, editConsulta)

router.delete('/consulta/:consultaId', validateJWT, deleteConsulta)
router.get('/consulta/:pacienteId?', validateJWT, getConsultas)

module.exports = router
