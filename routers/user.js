const express = require("express");
const router = express.Router();
const joi = require("joi");

const validateJWT = require("../middleware/validateJWT");
const validator = require("../middleware/joiValidator");

//schemas
const updateSchema = joi.object({
  newName: joi.string().required(),
  newEmail: joi.string().required(),
  cpf: joi.string().required().max(11),
});

const putSchema = joi.object({
  password: joi.string().required(),
  newPassword: joi.string().required(),
});

const {
  getUserInfo,
  updateUser,
  changePassword,
  getPsicUsers,
} = require("../controllers/userController");

router
  .route("/user")
  .get(validateJWT, getUserInfo)
  .put(validator(updateSchema), validateJWT, updateUser);

router.put(
  "/change_password",
  validator(putSchema),
  validateJWT,
  changePassword
);
router.get("/psic_users", validateJWT, getPsicUsers);
module.exports = router;
