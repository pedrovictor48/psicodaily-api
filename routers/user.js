const express = require("express");
const router = express.Router();
const joi = require("joi");

const validateJWT = require("../middleware/validateJWT");
const validator = require("../middleware/joiValidator");

//schemas
const updateSchema = joi.object({
	name: joi.string().required(),
	email: joi.string().required(),
	cpf: joi.string().required().max(11),
})

const putSchema = joi.object({
	password: joi.string().required(),
	newPassword: joi.string().required()
})

const {getUserInfo, updateUser, changePassword} = require("../controllers/userController")

router
	.route("/user")
	.get(validateJWT, getUserInfo)
	.put(validator(updateSchema), validateJWT, updateUser)

router.put("/change_password", validator(putSchema), changePassword)

module.exports = router
