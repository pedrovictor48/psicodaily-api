const User = require("../models/user");
const Patient = require("../models/paciente");
const bcrypt = require("bcrypt");

const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ _id: userId }).select(
      "name email cpf psic_id"
    );

    return res.status(200).send(user);
  } catch {
    return res.sendStatus(500);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, newName, newEmail, cpf } = req.body;

    await User.findOneAndUpdate(
      { _id: userId },
      { name: newName, email: newEmail, cpf }
    );

    res.sendStatus(200);
  } catch {
    return res.sendStatus(500);
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, password, newPassword } = req.body;

    const user = await User.findById(userId);

    if (await bcrypt.compare(password, user.password)) {
      const hash = await bcrypt.hash(newPassword, 10);
      await user.updateOne({ password: hash });
      return res.sendStatus(200);
    } else {
      return res.sendStatus(403);
    }
  } catch {
    return res.sendStatus(500);
  }
};

const getPsicUsers = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (user.__t != "Psicologo") return res.sendStatus(403);

    const patients = await Patient.find({ psic_id: userId });

    return res.status(200).send(patients);
  } catch {
    return res.sendStatus(500);
  }
};

module.exports = { getUserInfo, updateUser, changePassword, getPsicUsers };
