import helpers from "../lib/helpers.js";
import { Client } from "../models/client.js";

export const getIndex = (_req, res) => {
  res.render("client/index");
};

export const getRegister = (_req, res) => {
  res.render("client/register");
};

export const listEconmmied = (_req, res) => {
  res.render("encomiendas/lista-encomiendas");
};

export const getLogin = (_req, res) => {
  res.render("client/login");
};

export const postClient = async (req, res) => {
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

export const postLogin = async (req, res) => {
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

export const getUsers = async (_req, res) => {
  const users = await User.findAll()
    .then((res) => {
      return res;
    })
    .catch(() => {
      return null;
    });

  if (!users) return res.status(404).json("failed query");
  res.json({ users: users });
};

export const createUser = async (req, res) => {
  console.log("req", req.body);
  const newUser = await User.create(req.body);
  console.log(newUser, "new");

  res.send("post user");
};
