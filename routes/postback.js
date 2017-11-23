var express = require('express');
var router = express.Router();
var message = require('./message');
var userService = require('../services/user.service');

// processes postbacks
function processPostback(event) {
    var senderId = event.sender.id;

    if(event.postback.payload === "Greeting") {
        userService.saveUser(senderId);
        var welcome_message = "Hello, my name is Platty the PennApps bot. How may I help you?";
        message.sendMessengerTextMessage(event.sender.id, welcome_message);
    }
}

module.exports = {
  processPostback: processPostback
};
