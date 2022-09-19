const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/auth");
const { updateUser } = require("../helpers/loginQuery");
const pool = require("../database");

const datos = [
  {
    fecha: "22-04-25",
    hora_salida: "09:10",
    hora_llegada: "09:00",
    ruta: "Quito-Loja",
    asientos: "10",
    encomiendas: "10",
  },
  {
    fecha: "22-04-25",
    hora_salida: "09:00",
    hora_llegada: "09:00",
    ruta: "Quito-Guayas",
    asientos: "10",
    encomiendas: "10",
  },
  {
    fecha: "22-04-25",
    hora_salida: "09:00",
    hora_llegada: "09:00",
    ruta: "Quito-Cuenca",
    asientos: "10",
    encomiendas: "10",
  },
  {
    fecha: "22-04-25",
    hora_salida: "09:00",
    hora_llegada: "09:00",
    ruta: "Quito-Guayas",
    asientos: "10",
    encomiendas: "10",
  },
  {
    fecha: "22-04-25",
    hora_salida: "09:00",
    hora_llegada: "09:00",
    ruta: "Quito-Guayas",
    asientos: "10",
    encomiendas: "10",
  },
];

router.get("/bus", (req, res) => {
  res.render("socio/bus");
});

router.get("/detalle", async (req, res) => {
  let userInto = [5, "1725648562", "Juan", "a@r.com"];

  const data = `INSERT INTO passengers(id,dni,name,email) VALUES ($1,$2,$3,$4)`;
  /* Insertar datos en una tabla  */
  
  /* await pool.query(data, userInto).then((response) => {
    console.log(response, "Usuario ingreso?");
  }); */

  /* listamos todos los pasajeros */

  let users = await pool
    .query("SELECT * FROM public.passengers")
    .then((res) => {
      return !res.rows ? [] : res.rows;
    });

  res.render("socio/detalle", { datos, users });
});

router.get("/bus-coop", (req, res) => {
  res.render("socio/bus-coop");
});

module.exports = router;
