'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// database
const mongoose = require('mongoose');
const database = mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
  res.send('Hello world, I am a chat bot');
});

/*
// setup
var getStarted = require('./routes/get_started');
app.get('/setup', getStarted);
*/

// for Facebook verification
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'process.env.VERIFICATION_TOKEN') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});

// Spin up the server
app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'));
});


// handles callbacks
var callbacks = require('./routes/callbacks');
app.post('/webhook', callbacks);
