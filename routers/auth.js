require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const connectDB = require("../config/connectDatabase");
const app = express();
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
  getUserInfo,
} = require("../controllers/authController");

const validator = require("../middleware/joiValidator");
const duplicatedEmail = require("../middleware/duplicatedEmail");
const validateJWT = require("../middleware/validateJWT");

app.use(cors(corsOptions)); // <---

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

router.get("/teste/", (req, res) => {
  res.send("teste");
});

router.get("/users", getAllUsers);

router.get("/userinfo", validateJWT, getUserInfo);

module.exports = router;
