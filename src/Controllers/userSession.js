const express = require('express');
const app = express.Router();

//INDEX
app.get('/', (req, res) => {
	res.render('coop/index', { layout: 'coopSession' });
});

//INFORMACION
app.get('/informacion', (req, res) => {
	res.render('coop/information', { layout: 'coopSession' });
});

app.post('/information', (req, res) => {
	res.json({
		ok: true,
		msg: {
			method: 'POST',
			txt: 'Agrega datos',
		},
	});
});

app.put('/information', (req, res) => {
	res.json({
		ok: true,
		msg: {
			method: 'update',
			txt: 'Actualiza datos',
		},
	});
});

app.delete('/information', (req, res) => {
	res.json({
		ok: true,
		msg: {
			method: 'POST',
			txt: 'Elimina datos',
		},
	});
});

module.exports = app;
