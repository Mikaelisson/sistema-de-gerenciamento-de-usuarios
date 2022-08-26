const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    let doc = await User.find({});
    res.render("index", {doc});
  } catch (error) {
    res.send("Error na página inicial", error);
  }
});

router.post("/register", async (req, res)=>{

  let doc = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  })

  try {
    await doc.save();
    res.redirect("/")
  } catch (error) {
    res.send("Error ao registrar usuário" + error)
  }

})

module.exports = router;
