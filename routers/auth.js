require("dotenv").config();
const express = require("express");
const router = express.Router();

const {
  pacientSchema,
  psicologoSchema,
  loginSchema,
} = require("../utils/schemas");

const {
  login,
  registerPac,
  registerPsic,
  getAllUsers,
} = require("../controllers/authController");

const validator = require("../middleware/joiValidator");
const duplicatedEmail = require("../middleware/duplicatedEmail");

router.post("/login", validator(loginSchema), login);

router.post(
  "/pac_register",
  validator(pacientSchema),
  duplicatedEmail,
  registerPac
);

router.post(
  "/psic_register",
  validator(psicologoSchema),
  duplicatedEmail,
  registerPsic
);

router.get("/users", getAllUsers);

module.exports = router;
