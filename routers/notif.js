require("dotenv").config();
const express = require("express");
const router = express.Router();
const joi = require("joi");

const validateJWT = require("../middleware/validateJWT");
const validator = require("../middleware/joiValidator");

const {
	getNotifs,
	addNotif,
	deleteNotif,
	accept,
} = require("../controllers/notifController")

// to fazendo aq pq o utilities ja ta cheio de exports dps penso melhor
const postSchema = joi.object({
	pacEmail: joi.string().required()
})

const deleteSchema = joi.object({
	notifId: joi.string().required()
})

router
	.route("/notif")
	.get(validateJWT, getNotifs)
	.post(validator(postSchema), validateJWT, addNotif)
	.delete(validator(deleteSchema), validateJWT, deleteNotif)

// essa rota accept so pra vincular
router.put("/accept", validator(deleteSchema), validateJWT, accept);
	
module.exports = router
