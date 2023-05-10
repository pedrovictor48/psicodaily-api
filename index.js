require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/connectDatabase");

connectDB();

const app = express();

const port = process.env.PORT || 3005;

app.use(express.json());

app.use(cors(corsOptions)); // <---

const registro = require("./routers/registro");
const auth = require("./routers/auth");

app.use(registro);
app.use(auth);

mongoose.connection.once("open", () => {
  console.log("Conectando ao db...");
  app.listen(port, () => console.log(`Server running at ${port}`));
});
