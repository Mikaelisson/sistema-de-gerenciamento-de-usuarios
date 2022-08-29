const User = require("../models/User");

//buscar dados de todos usuários
const dataSearch = async (req, res) => {
  try {
    const doc = await User.find({});
    res.render("index", { doc });
  } catch (error) {
    res.status(404).send("Error na página inicial" + error);
  }
};

//apresenta todas informações cadastradas do usuário
const viewMore = async (req, res) => {
  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    const doc = await User.findById(id);
    res.render("view", { doc });
  } catch (error) {
    res.status(404).send("Error na página de view");
  }
};

//aprenseta pagina de regirar usuario
const getRegister = async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    res.status(404).send("Error ao redirecionar no registro de usuário");
  }
};

//registrar novo usuário
const register = async (req, res) => {
  const doc = new User(req.body);
  try {
    await doc.save();
    res.redirect("/");
  } catch (error) {
    res.status(404).send("Error ao registrar usuário" + error);
  }
};

//recupera dados para edição
const getUpdate = async (req, res) => {
  let id = req.params.id;
  if (!id) id = req.body.id;
  try {
    const doc = await User.findById(id);
    res.render("edit", { doc });
  } catch (error) {
    res.status(404).send("Error ao editar usuário");
  }
};

//editar informações de usuário
const update = async (req, res) => {
  let id = req.params.id;
  if (!id) id = req.body.id;

  const doc = req.body;

  try {
    await User.findByIdAndUpdate(id, doc);
    res.redirect("/");
  } catch (error) {
    res.status(404).send("Error ao atualizar usuário" + error);
  }
};

//deletar usuário
const deleteUser = async (req, res) => {
  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    const docToDelete = await User.findById(id);

    if (docToDelete) {
      await User.findByIdAndDelete(id);
      res.redirect("/")
    } else {
      console.log("Usuário não existe", error.message);
    }
  } catch (error) {
    res.status(404).send(`Error ao deletar usuário ${error.message}`);
  }
};

module.exports = {
  dataSearch,
  register,
  update,
  deleteUser,
  getUpdate,
  getRegister,
  viewMore,
};
