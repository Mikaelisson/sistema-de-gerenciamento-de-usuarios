const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const User = require("../models/User");

router.get("/", controller.dataSearch);
router.get("/edit/:id", async (req, res) => {
  let id = req.params.id;
  if (!id) id = req.body.id;
  try {
    const doc = await User.findById(id);
    res.render("edit", { doc });
  } catch (error) {
    res.status(404).send("Error ao editar usuário");
  }
});

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
