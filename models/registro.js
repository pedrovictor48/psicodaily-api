const mongoose = require("mongoose");

const registroSchema = new mongoose.Schema({
    data: Date,
    titulo: String,
    text: Text,
});

const Registro = mongoose.model("Registro", registroSchema);

module.exports = Registro;
