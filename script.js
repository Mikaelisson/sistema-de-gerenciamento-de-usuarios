const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const router = require("./routes/router");
const exp = require("constants");
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

app.use("/", express.urlencoded({extended: true}))
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
