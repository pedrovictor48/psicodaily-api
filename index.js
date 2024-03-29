require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDatabase");

const app = express();

app.use(cors());

connectDB();

const port = process.env.PORT || "3005";

app.use(express.json());

const registro = require("./routers/registro");
const auth = require("./routers/auth");
const consulta = require("./routers/consulta");
const user = require("./routers/user");
const notif = require("./routers/notif");
const mensagem = require("./routers/mensagem");
const image = require("./controllers/imageController");

app.use(registro);
app.use(auth);
app.use(consulta);
app.use(user);
app.use(notif);
app.use(mensagem);
app.use(image);

app.get("/", (req, res) => {
  res.send("oi");
});
app.get("/ola", (req, res) => {
  res.send("ola");
});

app.listen(port, () => console.log(`Server running at ${port}`));
