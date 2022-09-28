const helpers = require("../lib/helpers");
const Client = require("../models/client");
const clientController = {};
/* Redirect Views */
clientController.getIndex = (_req, res) => {
  res.render("client/index");
};

clientController.getRegister = (_req, res) => {
  res.render("client/register");
};

clientController.getLogin = (_req, res) => {
  res.render("client/login");
};

clientController.postClient = async (req, res) => {
  const { email, password } = req.body;
  const clientDB = await Client.findOne({
    where: {
      email: email,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  if (clientDB) {
    let message = "Usuario ya registrado";
    return res.render("client/register", { message });
  }
  if (password[0] !== password[1]) {
    let message = "Las contraseñas no coinciden";
    return res.render("client/register", { message });
  }

  const newClient = await Client.create({
    email: email,
    password: await helpers.encryptPassword(password[0]),
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return null;
    });
  if (!newClient) {
    let message = "Error en el registro";
    return res.render("client/register", { message });
  }
  res.redirect("/client/");
};

clientController.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const clientDB = await Client.findOne({
    where: {
      email: email,
    },
  })
    .then((res) => {
      return res.dataValues;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  let message = "Usuario/contraseña incorrecto";

  if (!clientDB) {
    return res.render("client/login", { message });
  }
  let passDB = await helpers.matchPassword(password, clientDB.password);
  console.log(passDB);
  if (!passDB) {
    return res.render("client/login", { message });
  }

  res.redirect("/client/");
};


module.exports = clientController