const express = require("express");
const router = express.Router();

const validateJWT = require("../middleware/validateJWT");
const validator = require("../middleware/joiValidator");

const {getUserInfo} = require("../controllers/userController")

router
	.route("/user")
	.get(validateJWT, getUserInfo)

module.exports = router
