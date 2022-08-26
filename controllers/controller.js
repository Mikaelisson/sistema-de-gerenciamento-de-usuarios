const User = require("../models/User");

const dataSearch = async (req, res) => {
  try {
    let doc = await User.find({});
    res.render("index", { doc });
  } catch (error) {
    res.send("Error na página inicial" + error);
  }
};

const register = async (req, res) => {
  let doc = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
  });
  try {
    await doc.save();
    res.redirect("/");
  } catch (error) {
    res.send("Error ao registrar usuário" + error);
  }
};

const update = async (req, res) => {
  let id = req.params.id;
  if (!id) id = req.body.id;

  let doc = {};
  doc.name = req.body.name;
  doc.phone = req.body.phone;
  doc.email = req.body.email;

  try {
    await User.findByIdAndUpdate(id, doc);
    res.redirect("/");
  } catch (error) {
    res.send("Error ao atualizar usuário" + error);
  }
};

const deleteUser = async (req, res) => {
  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    let doc = await User.findByIdAndDelete(id);
    if (doc) res.redirect("/");
    else error;
  } catch (error) {
    res.send("Error ao deletar usuário" + error);
  }
};

module.exports = { dataSearch, register, update, deleteUser };
