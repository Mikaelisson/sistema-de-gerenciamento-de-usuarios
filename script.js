const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const router = require("./routes/router");
require("dotenv").config();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_CONNECT);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Banco Carregado");
});
db.once("error", () => {
  console.log("Error ao carregar banco");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", router);
app.use("/scripts", express.static(path.join(__dirname, "views/scripts")));

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
