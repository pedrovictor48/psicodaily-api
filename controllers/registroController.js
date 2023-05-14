const User = require("../models/user");
const Registro = require("../models/registro");

const getRegistro = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findOne({ _id: userId });

  if (user.__t == "Psicologo") {
    return res.status(500).send({ message: "not implemented" });
  }

  const registers = await Registro.find({ pacienteId: user._id });

  return res.status(200).send({ registers });
};

const postRegistro = async (req, res) => {
  const { data, titulo, text, userId } = req.body;

  const newRegistro = new Registro({
    data,
    titulo,
    text,
    pacienteId: userId,
  });

  await newRegistro.save();

  return res.status(200).send({ registro: newRegistro });
};

const deleteRegistro = async (req, res) => {
  const { userId, registroId } = req.body;
  const registro = await Registro.findById(registroId);

  if (!registro || registro.pacienteId != userId) {
    return res.status(404).send({ message: "Registro nao encontrado" });
  }

  await registro.deleteOne();
  return res.sendStatus(200);
};

const editRegistro = async (req, res) => {
  const { userId, registroId } = req.body;
  const register = await Registro.findById(registroId);
  if (!register || register.pacienteId != userId) {
    return res.status(404).send({ message: "Registro nao encontrado" });
  }

  await register.updateOne({
    data: req.body.data,
    titulo: req.body.titulo,
    text: req.body.text,
  });

  return res.sendStatus(200);
};

module.exports = {
  getRegistro,
  postRegistro,
  deleteRegistro,
  editRegistro,
};
