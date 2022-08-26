const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.get("/", controller.dataSearch);

router.post("/register", controller.register);
router.post("/update/:id", controller.update);
router.post("/delete/:id", controller.deleteUser);

module.exports = router;
