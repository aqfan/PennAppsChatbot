const API_AI_TOKEN = '5dcd7010f2704620bb22caa7cbd5deef';
var apiAiClient = require('apiai')(API_AI_TOKEN);
var request = require('request');

function processMessage (event) {
    sendMessengerTextMessage(event.sender.id, event.message.text);
}

// creates message object
function sendMessengerTextMessage(recipientId, messageText) {
  var apiaiSession = apiAiClient.textRequest(messageText, {
          sessionId: recipientId
  });

  apiaiSession.on('response', function(response) {
      var language = '';

      if (response.result.contexts[0] &&
          response.result.contexts[0].name === 'mentor-followup') {
          switch(response.result.action) {
              case 'need_mentor':
                messageText = response.result.fulfillment.speech;
                break;
              case 'mentor.mentor-Java':
              case 'mentor.mentor-JavaScript':
              case 'mentor.mentor-Ruby':
              case 'mentor.mentor-HTML/CSS':
                language = response.result.parameters.language;
                messageText = response.result.fulfillment.speech;
                break;
          }
      }

      console.log(language);
      return sendMessengerResponse({
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText
        }
      });
  });

  apiaiSession.on('error', function(error) {
      console.log(error);
  });

  apiaiSession.end();
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

module.exports = {
  processMessage: processMessage,
  sendMessengerTextMessage: sendMessengerTextMessage,
  sendMessengerResponse, sendMessengerResponse
};
