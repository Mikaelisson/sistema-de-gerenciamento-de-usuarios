const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
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

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
