var parser = require('../services/parsemessages');
var userService = require('../services/saveuser');

// processes postbacks
var processPostback = function (event) {
  var senderId = event.sender.id;

  if (event.postback.payload === 'Greeting') {
    userService.saveUser(senderId);
    var welcome_message = 'Hello, my name is Platty the PennApps bot. I can answer questions about PennApps. How may I help you?';
    return parser.sendMessengerResponse({
      recipient: {
        id: senderId
      },
      message: {
        text: welcome_message
      }
    });
  }
};

module.exports = {
  processPostback : processPostback
};
