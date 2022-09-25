const express = require('express');
const app = express.Router();

app.get('/login', (req, res) => {
	res.render('auth/COOP/login', { layout: 'background' });
});

module.exports = app;
