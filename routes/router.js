const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const methodOverride = require("method-override");
const session = require("express-session");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(methodOverride("_method"));
router.use(
  session({
    secret: "fej8fdn8ehfne7gf7",
    resave: false,
    saveUninitialized: true,
  })
);

if (router.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

router.get("/", controller.dataSearch);
router.get("/register", controller.getRegister);
router.get("/login", controller.getLogin);
router.get("/edit/:id", controller.getUpdate);
router.get("/view/:id", controller.viewMore);
router.get("/error", controller.viewMore);
router.get("/desconect", controller.desconect);

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/update/:id", controller.update);

router.delete("/:id", controller.deleteUser);
router.delete("/", controller.deleteUser);

module.exports = router;
