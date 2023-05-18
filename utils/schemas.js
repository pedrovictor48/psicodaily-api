const joi = require("joi");

// Auth Schemas

const loginSchema = joi.object({
  email: joi.string().required().max(50),
  password: joi.string().required().max(50),
});

const pacientSchema = joi.object({
  name: joi.string().required().max(100),
  email: joi.string().required().max(100),
  password: joi.string().required().max(20),
  cpf: joi.string().required().length(11),
});

const psicologoSchema = joi.object({
  name: joi.string().required().max(100),
  email: joi.string().required().max(100),
  password: joi.string().required().max(20),
  cpf: joi.string().required().length(11),
  crp: joi.string().required(),
});

// Registro Schemas

const postRegistroSchema = joi.object({
  data: joi.date().required(),
  titulo: joi.string().required().max(50),
  text: joi.string().required(),
});

const deleteRegistroSchema = joi.object({
  registroId: joi.string().required(),
});

const editRegistroSchema = joi.object({
  registroId: joi.string().required(),
  data: joi.date().required(),
  titulo: joi.string().required().max(50),
  text: joi.string().required(),
});

const postConsultaSchema = joi.object({
	startDate: joi.date().required(),
	pacId: joi.string().required(),
});

const putConsultaSchema = joi.object({
	startDate: joi.date().required(),
	consultaId: joi.string().required(),
	pacId: joi.string().required(),
});

const deleteConsultaSchema = joi.object({
	consultaId: joi.string().required(),
});


module.exports = {
  loginSchema,
  pacientSchema,
  psicologoSchema,
  postRegistroSchema,
  deleteRegistroSchema,
  editRegistroSchema,
	postConsultaSchema,
	putConsultaSchema,
	deleteConsultaSchema,
};
