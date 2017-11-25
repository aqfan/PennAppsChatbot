var User = require('../models/user');
var parser = require('../services/parsemessages')

var processMessage = function (event) {
  sendMessengerTextMessage(event.sender.id, event.message.text);
};

// creates message object
var sendMessengerTextMessage = function (recipientId, messageText) {
  User.findOne({facebookId: recipientId}, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      if (!user.pauseAI) {
        parser.notPaused(recipientId, messageText);
      } else {
        parser.paused(recipientId, messageText);
      }
    }
  });
};

module.exports = {
  processMessage: processMessage,
  sendMessengerTextMessage: sendMessengerTextMessage
};
