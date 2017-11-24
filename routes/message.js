const API_AI_TOKEN = '5dcd7010f2704620bb22caa7cbd5deef';
var apiAiClient = require('apiai')(API_AI_TOKEN);
var request = require('request');

var processMessage = function (event) {
  sendMessengerTextMessage(event.sender.id, event.message.text);
};

// creates message object
var sendMessengerTextMessage = function (recipientId, messageText) {
  var apiaiSession = apiAiClient.textRequest(messageText, {
    sessionId: recipientId
  });

  apiaiSession.on('response', function (response) {
    var language = '';
    if (response.result.action === 'request-mentor') {
      language = response.result.parameters.language;
      messageText = response.result.fulfillment.speech;
      var searchForMentor = require('../services/searchmentor');
      searchForMentor.searchForMentor(recipientId, language);
    } else if (response.result.action === 'add-mentor') {
      language = response.result.parameters.language;
      messageText = response.result.fulfillment.speech;
      var saveMentor = require('../services/savementor');
      saveMentor.saveMentor(recipientId, language);
    } else if (response.result.action === 'live-agent') {
      User.findOne({facebookId : recipientId}, 'firstName lastName', function (err, userData) {
        return sendMessengerResponse({
          recipient: {
            id: '1603837449659792'
          },
          message: {
            text: 'Please help ' + userData.firstName + ' ' + userData.lastName
          }
        });
      });

    } else {
      messageText = response.result.fulfillment.speech;
    }

    return sendMessengerResponse({
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    });
  });

  apiaiSession.on('error', function (error) {
    console.log(error);
  });

  apiaiSession.end();
};

// sends message response to user
var sendMessengerResponse = function (messageData) {
  return request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending message: ' + response.error);
    } else {
      console.log('Message sent to' + messageData.recipient.id);
    }
  });
};

module.exports = {
  processMessage: processMessage,
  sendMessengerTextMessage: sendMessengerTextMessage,
  sendMessengerResponse: sendMessengerResponse
};
