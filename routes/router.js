const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.dataSearch);

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
