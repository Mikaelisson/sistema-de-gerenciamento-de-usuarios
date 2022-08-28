const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const User = require("../models/User");

router.get("/", controller.dataSearch);
router.get("/register", controller.getRegister);
router.get("/edit/:id", controller.getUpdate);

router.post(
  "/register",
  express.urlencoded({ extended: true }),
  controller.register
);
router.post(
  "/update/:id",
  express.urlencoded({ extended: true }),
  controller.update
);

router.delete("/:id", controller.deleteUser);
router.delete("/", express.json(), controller.deleteUser);

module.exports = router;
