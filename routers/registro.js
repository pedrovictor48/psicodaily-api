require("dotenv").config();
const express = require("express");
const router = express.Router();

const validateJWT = require("../middleware/validateJWT");
const validator = require("../middleware/joiValidator");
const {
  getRegistro,
  postRegistro,
  deleteRegistro,
  editRegistro,
} = require("../controllers/registroController");

const {
  postRegistroSchema,
  deleteRegistroSchema,
  editRegistroSchema,
} = require("../utils/schemas");

router
  .route("/registro")
  .get(validateJWT, getRegistro)
  .post(validator(postRegistroSchema), validateJWT, postRegistro)
  .put(validator(editRegistroSchema), validateJWT, editRegistro);

router.get("/registro/:pacienteId?", validateJWT, getRegistro)

router.delete("/registro/:registroId", validateJWT, deleteRegistro);

module.exports = router;
