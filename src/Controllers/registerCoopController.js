const express = require('express');
const app = express.Router();

app.get('/registro', (req, res) => {
	res.render('auth/COOP/register', { layout: 'background' });
});

app.post('/registro', (req, res) => {
	//TODO: Guardamos los datos del registro y luego creamos un numero de caso
	//TODO: Cuando el registro este ok debera confirmar su email

	const numberCase = '1234'; //1234 es el numero de caso de este registro, es decir con este nro identificamos a este registro en particular
	res.redirect(`/COOP/register/${numberCase}`);
});

app.get('/registro/:id', (req, res) => {
	//TODO: Buscar el id del registro en la DB y depende esto redirigelo respectivamente

	const id = req.params.id;

	if (id == '1234') {
		return res.render('auth/COOP/registerConfirm', { layout: 'background' });
	}

	res.redirect('/COOP/register');
});

module.exports = app;
