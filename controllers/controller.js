const User = require("../models/User");

//buscar dados de todos usuários
const dataSearch = async (req, res) => {
  const sessionLogin = req.session.login;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ name: sessionLogin });
      const admin = adminData.permission;
      const doc = await User.find({});
      doc.reverse();
      res.render("index", { doc, sessionLogin, admin });
    } else {
      const admin = null;
      const doc = await User.find({});
      doc.reverse();
      res.render("index", { doc, sessionLogin, admin });
    }
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error(
      "Error ao buscar dados, tente novamente ou entre em contato com o suporte." +
        error
    );
    res.status(404).render("error", { doc, sessionLogin, redirectUser });
  }
};

//apresenta todas informações cadastradas do usuário
const viewMore = async (req, res) => {
  const sessionLogin = req.session.login;

  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ name: sessionLogin });
      const admin = adminData.permission;

      if (admin !== "Admin") {
        const admin = null;
        const doc = await User.findById(id);
        res.render("view", { doc, sessionLogin, admin });
      } else {
        const doc = await User.findById(id);
        res.render("view", { doc, sessionLogin, admin });
      }
    } else {
      const admin = null;
      const doc = await User.findById(id);
      res.render("view", { doc, sessionLogin, admin });
    }
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error("Error ao visualizar usuário, tente novamente.");
    res.status(404).render("error", { doc, redirectUser });
  }
};

//apresenta pagina de regirar usuario
const getRegister = async (req, res) => {
  const sessionLogin = req.session.login;
  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ name: sessionLogin });
      const admin = adminData.permission;

      if (admin !== "Admin") {
        const admin = null;
        res.render("register", { sessionLogin, admin });
      } else {
        res.render("register", { sessionLogin, admin });
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error(
      "Error ao redirecionar para o registro de usuário, tente novamente."
    );
    res.status(404).render("error", { doc, redirectUser, sessionLogin });
  }
};

//registrar novo usuário
const register = async (req, res) => {
  const sessionLogin = req.session.login;
  const errorCredential = new Error("Dados inválidos, tente novamente.");
  const doc = new User(req.body);

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      if (
        req.body.name === "" ||
        typeof req.body.name !== "string" ||
        req.body.office === "" ||
        typeof req.body.office !== "string" ||
        req.body.email === "" ||
        typeof req.body.email !== "string" ||
        req.body.phone === "" ||
        typeof req.body.phone !== "string" ||
        req.body.password === "" ||
        typeof req.body.password !== "string" ||
        req.body.password.length < 6
      ) {
        error;
      } else {
        await doc.save();
        res.redirect("/");
      }
    } else {
      error;
    }
  } catch (error) {
    const redirectUser = "/register";
    const doc = new Error(
      "Error ao registrar usuário. " + errorCredential.message
    );
    res.status(404).render("error", { doc, redirectUser, sessionLogin });
  }
};

//apresenta pagina de login
const getLogin = async (req, res) => {
  const sessionLogin = req.session.login;
  try {
    const doc = await User.find({});
    res.render("login", { doc, sessionLogin });
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error(
      "Error ao redirecionar para autenticação de usuário, tente novamente."
    );
    res.status(404).render("error", { doc, redirectUser });
  }
};

//autenticar usuário
const login = async (req, res) => {
  const user = req.body;
  const sessionLogin = null;
  const errorCredential = new Error("Credencias inválidas, tente novamente.");

  try {
    if (!user.name) throw new Error("Usuário não definido.");
    if (!user.password) throw new Error("Senha inválida, tente novamente.");

    const doc = await User.findOne({
      name: user.name,
      password: user.password,
    });

    if (!doc) errorCredential.message;

    if (doc.name === user.name || doc.password === user.password) {
      req.session.login = doc.name;
      res.redirect("/");
    } else {
      errorCredential.message;
    }
  } catch (error) {
    const redirectUser = "/login";
    const doc = new Error("Error ao autenticar usuário.");
    res.status(404).render("error", { doc, redirectUser });
  }
};

//desconectar usuário
const desconect = async (req, res) => {
  try {
    req.session.login = null;
    res.redirect("/");
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error("Error ao desconectar usuário, tente novamente.");
    res.status(404).render("error", { doc, redirectUser });
  }
};

//recupera dados para edição
const getUpdate = async (req, res) => {
  const sessionLogin = req.session.login;

  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ name: sessionLogin });
      const admin = adminData.permission;

      if (admin !== "Admin") {
        error;
      } else {
        const doc = await User.findById(id);
        res.render("edit", { doc, sessionLogin });
      }
    } else {
      error;
    }
  } catch (error) {
    const redirectUser = "/edit/" + id;
    const doc = new Error("Error ao editar usuário, tente novamente.");
    res.status(404).render("error", { doc, sessionLogin, redirectUser });
  }
};

//editar informações de usuário
const update = async (req, res) => {
  const sessionLogin = req.session.login;
  let id = req.params.id;
  if (!id) id = req.body.id;

  const doc = req.body;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ name: sessionLogin });
      const admin = adminData.permission;

      if (admin !== "Admin") {
        error;
      } else {
        const user = await User.findById(id);

        if (
          user.name === req.body.name &&
          user.phone === req.body.phone &&
          user.email === req.body.email &&
          user.office === req.body.office &&
          user.permission === req.body.permission
        ) {
          error;
        } else {
          await User.findByIdAndUpdate(id, doc);
          res.redirect("/");
        }
      }
    } else {
      error;
    }
  } catch (error) {
    const redirectUser = "/edit/" + id;
    const doc = new Error("Error ao editar usuário, tente novamente.");
    res.status(404).render("error", { doc, redirectUser, sessionLogin });
  }
};

//deletar usuário
const deleteUser = async (req, res) => {
  const sessionLogin = req.session.login;
  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ name: sessionLogin });
      const admin = adminData.permission;

      if (admin !== "Admin") {
        error;
      } else {
        const docToDelete = await User.findById(id);
        if (docToDelete.name === req.session.login) req.session.login = null;

        if (docToDelete) {
          await User.findByIdAndDelete(id);
          res.redirect("/");
        }
      }
    } else {
      error;
    }
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error(
      "Usuário não existe ou já foi deletado, tente novamente."
    );
    res.status(404).render("error", { doc, redirectUser, sessionLogin });
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
  getLogin,
  login,
  desconect,
};
