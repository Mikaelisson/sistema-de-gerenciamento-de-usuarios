const User = require("../models/User");
const bcrypt = require("bcryptjs");

//buscar dados de todos usuários
const dataSearch = async (req, res) => {
  const sessionLogin = req.session.login;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ email: sessionLogin });
      const admin = adminData.permission;
      const authenticatedUser = adminData.name;
      const doc = await User.find({});
      doc.reverse();
      res.render("index", { doc, sessionLogin, authenticatedUser, admin });
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
    const admin = req.session.login;
    res.status(404).render("error", { doc, sessionLogin, redirectUser, admin });
  }
};

//apresenta todas informações cadastradas do usuário
const viewMore = async (req, res) => {
  const sessionLogin = req.session.login;

  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ email: sessionLogin });
      const admin = adminData.permission;
      const authenticatedUser = adminData.name;

      if (admin !== "admin") {
        const admin = null;
        const doc = await User.findById(id);
        res.render("view", { doc, sessionLogin, authenticatedUser, admin });
      } else {
        const doc = await User.findById(id);
        res.render("view", { doc, sessionLogin, authenticatedUser, admin });
      }
    } else {
      const admin = null;
      const doc = await User.findById(id);
      res.render("view", { doc, sessionLogin, authenticatedUser, admin });
    }
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error("Error ao visualizar usuário, tente novamente.");
    res.status(404).render("error", { doc, redirectUser, sessionLogin });
  }
};

//apresenta pagina de registrar usuario
const getRegister = async (req, res) => {
  const sessionLogin = req.session.login;
  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ email: sessionLogin });
      const admin = adminData.permission;
      const authenticatedUser = adminData.name;

      if (admin !== "admin") {
        const admin = null;
        res.render("register", { sessionLogin, authenticatedUser, admin });
      } else {
        res.render("register", { sessionLogin, authenticatedUser, admin });
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
  const salt = bcrypt.genSaltSync(10);

  const sessionLogin = req.session.login;
  const errorCredential = new Error("Dados inválidos, tente novamente.");

  try {
    const checkEmail = await User.findOne({
      email: req.body.email,
    });
    if (checkEmail) return error;

    const doc = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      office: req.body.office,
      permission: req.body.permission,
      password: bcrypt.hashSync(req.body.password, salt),
    });

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
    const authenticatedUser = null;
    const admin = null;
    res
      .status(404)
      .render("error", {
        doc,
        redirectUser,
        sessionLogin,
        admin,
        authenticatedUser,
      });
  }
};

//apresenta pagina de login
const getLogin = async (req, res) => {
  const sessionLogin = req.session.login;
  const admin = null;
  const authenticatedUser = null;
  try {
    const doc = await User.find({});
    res.render("login", { doc, sessionLogin, authenticatedUser, admin });
  } catch (error) {
    const redirectUser = "/";
    const doc = new Error(
      "Error ao redirecionar para autenticação de usuário, tente novamente."
    );
    const admin = req.session.login;
    res.status(404).render("error", { doc, redirectUser, sessionLogin, admin });
  }
};

//autenticar usuário
const login = async (req, res) => {
  const user = req.body;
  const sessionLogin = null;
  const errorCredential = new Error("Credencias inválidas, tente novamente.");

  try {
    if (!user.email) throw new Error("Usuário não definido.");
    if (!user.password) throw new Error("Senha inválida, tente novamente.");

    const doc = await User.findOne({
      email: user.email,
    });

    if (!doc) errorCredential.message;

    const passwordAndUserMatch = bcrypt.compareSync(
      user.password,
      doc.password
    );
    if (!passwordAndUserMatch)
      throw new Error("Senha inválida, tente novamente.");

    if (doc.email === user.email || doc.password === user.password) {
      req.session.login = doc.email;
      res.redirect("/");
    } else {
      errorCredential.message;
    }
  } catch (error) {
    const redirectUser = "/login";
    const admin = req.session.login;
    const doc = new Error("Error ao autenticar usuário.");
    res.status(404).render("error", { doc, redirectUser, sessionLogin, admin });
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
    res.status(404).render("error", { doc, redirectUser, sessionStorage });
  }
};

//recupera dados para edição
const getUpdate = async (req, res) => {
  const sessionLogin = req.session.login;

  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ email: sessionLogin });
      const admin = adminData.permission;
      const authenticatedUser = adminData.name;

      if (admin !== "admin") {
        error;
      } else {
        const doc = await User.findById(id);
        res.render("edit", { doc, sessionLogin, authenticatedUser, admin });
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
      const adminData = await User.findOne({ email: sessionLogin });
      const admin = adminData.permission;

      if (admin !== "admin") {
        error;
      } else {
        const user = await User.findById(id);

        //verificar se o usuário não está salvando os mesmos dados
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
    const admin = null;
    const authenticatedUser = null;
    res.status(404).render("error", {
      doc,
      redirectUser,
      sessionLogin,
      authenticatedUser,
      admin,
    });
  }
};

//deletar usuário
const deleteUser = async (req, res) => {
  const sessionLogin = req.session.login;
  let id = req.params.id;
  if (!id) id = req.body.id;

  try {
    if (sessionLogin && typeof sessionLogin === "string") {
      const adminData = await User.findOne({ email: sessionLogin });
      const admin = adminData.permission;

      if (admin !== "admin") {
        error;
      } else {
        const docToDelete = await User.findById(id);
        if (docToDelete.email === req.session.login) req.session.login = null;

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
