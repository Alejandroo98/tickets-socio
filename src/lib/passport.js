const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');
const { getDate } = require('../helpers/getTime');
const { getUser } = require('../helpers/loginQuery');

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'cedula',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, cedula, password, done) => {
      try {
        // let table = 'users_cliente';

        let rows = [];

        const cliente = await getUser('users_cliente', cedula);

        if (cliente.length > 0) {
          rows = cliente;
        }

        const colaborador = await getUser('users_colaborador', cedula);

        if (colaborador.length > 0) {
          rows = colaborador;
        }

        if (rows.length > 0) {
          const user = rows[0];
          const validPassword = await helpers.matchPassword(password, user.password);
          if (validPassword) {
            done(null, user, req.flash('success', 'Welcome', user.username));
          } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
          }
        } else {
          return done(null, false, req.flash('message', 'El usuario  no existe'));
        }
      } catch (error) {
        return done(null, false, req.flash('message', 'Error de conexion, intenta mas tarde'));
      }
    }
  )
);

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { nombres, direccion, telefono, email, password_conf } = req.body;

      /* 
      TODO: Antes de guardar los datos aqui tienes la tarea de validarlos, puede hacerlo creando un un helper.
      */

      const fecha_registro = getDate();
      const fk_rol = 5;

      const encryptPassword = await helpers.encryptPassword(password);

      try {
        const text =
          'INSERT INTO users_cliente( id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email ) values( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email';
        const values = [
          username,
          nombres,
          direccion,
          encryptPassword,
          telefono,
          fecha_registro,
          fk_rol,
          email,
        ];

        const result = await pool.query(text, values);
        return done(null, result.rows[0]);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.use(
  'local.signup.cola',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { nombres, direccion, telefono, roles, email, password_conf } = req.body;

      const fecha_registro = getDate();

      const encryptPassword = await helpers.encryptPassword(password);

      try {
        const text =
          'INSERT INTO users_colaborador( id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email ) values( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id_cedula, nombre, direccion, password, telefono, fecha_registro, fk_rol, email';
        const values = [
          username,
          nombres,
          direccion,
          encryptPassword,
          telefono,
          fecha_registro,
          roles,
          email,
        ];

        const result = await pool.query(text, values);
        return done(null, result.rows[0]);
      } catch (error) {
        console.log(error);
        console.log('Error: Archivo passport.js');
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id_cedula);
});

passport.deserializeUser(async (id, done) => {
  let user = {};
  const values = [id];
  const text = 'SELECT * FROM users_cliente WHERE id_cedula = $1';
  user = await pool.query(text, values);

  if (user.rows.length < 1) {
    const text_colaborador = 'SELECT * FROM users_colaborador WHERE id_cedula = $1';
    user = await pool.query(text_colaborador, values);
  }

  done(null, user.rows[0]);
});
