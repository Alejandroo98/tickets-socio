const express = require('express');
const app = express.Router();

app.get('/cambio-contrasena', (req, res) => {
	res.render('auth/COOP/forgot', { layout: 'background' });
});

app.post('/cambio-contrasena', (req, res) => {
	const { email } = req.body;

	// TODO: Buscar en la DB si existe el email etc.
	const buscarEnDB = () => true;
	const resultadoDB = buscarEnDB(email);

	if (resultadoDB) {
		//TODO: Si si existe muestrale un mensaje diciendo que revise su correcto electronico
	} else {
		//TODO: Si no existe muestrale un mensaje que no existe
	}
});

module.exports = app;
