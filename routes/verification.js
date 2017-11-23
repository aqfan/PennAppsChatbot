var express = require('express');
var app = express.Router();

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'process.env.VERIFICATION_TOKEN') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
});

module.exports = app;
