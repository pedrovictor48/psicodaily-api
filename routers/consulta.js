const express = require("express");
const router = express.Router();

const validateJWT = require("../middleware/validateJWT");
const validator = require("../middleware/joiValidator");

//middlewares
const {
	getConsultas,
	deleteConsulta, 
	editConsulta, 
	addConsulta
} = require("../controllers/consultaController")

//schemas
const {
	postConsultaSchema, 
	deleteConsultaSchema, 
	putConsultaSchema, 
} = require("../utils/schemas")

router
	.route("/consulta")
	.get(validateJWT, getConsultas)
	.post(validator(postConsultaSchema), validateJWT, addConsulta)
	.delete(validator(deleteConsultaSchema), validateJWT, deleteConsulta)
	.put(validator(putConsultaSchema), validateJWT, editConsulta)

module.exports = router;
