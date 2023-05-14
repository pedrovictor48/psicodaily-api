require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/connectDatabase");

const app = express();

app.use(cors());

connectDB();

const port = process.env.PORT || "3005";

app.use(express.json());

const registro = require("./routers/registro");
const auth = require("./routers/auth");

app.use(registro);
app.use(auth);

app.listen(port, () => console.log(`Server running at ${port}`));
