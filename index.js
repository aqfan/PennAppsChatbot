'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

//database
const mongoose = require('mongoose');
const database = mongoose.connect(process.env.MONGODB_URI);
const userService = require('./services/user.service');

const app = express();

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
});

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'process.env.VERIFICATION_TOKEN') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
});

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
});

// handles callbacks
var callbacks = require('./routes/callbacks');
app.post('/webhook', callbacks);

// processes postbacks
function processPostback(event) {
    var senderId = event.sender.id;

    if(event.postback.payload === "Greeting") {
        userService.saveUser(senderId);
        var welcome_message = "Hello, my name is Platty the PennApps bot. How may I help you?";
        sendMessengerTextMessage(event.sender.id, welcome_message);
    }

}

// creates message object
function sendMessengerTextMessage(recipientId, messageText) {
  return sendMessengerResponse({
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  });
};

// sends message response to user
function sendMessengerResponse(messageData) {
  return request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, function(error, response, body) {
    if (error) {
      console.log("Error sending message: " + response.error);
  } else {
      console.log("Message sent to" + messageData.recipient.id);
  }
  });
};
