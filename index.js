'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'process.env.VERIFICATION_TOKEN') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

// handles event types
app.post('/webhook', function (req, res) {
  var data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(function(entry) {
      var pageId = entry.id;
      var timeOfEvent = entry.time;

      entry.messaging.forEach(function(event) {
        if (event.message) {
        // Handles messages
        console.log(event.message.text);
        sendMessengerTextMessage(event.sender.id, event.message.text);
        } else if (event.postback) {
        //handles postbacks
        var welcome_message = "Hello, my name is Platty the PennApps bot. How may I help you?";
        sendMessengerTextMessage(event.sender.id, welcome_message);
      }
      });
    });

    res.sendStatus(200);
  }
});

// sends message to user
function sendMessengerTextMessage(recipientId, messageText) {
  return sendMessengerResponse({
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  });
}

// handle message
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
}
