const API_AI_TOKEN = '5dcd7010f2704620bb22caa7cbd5deef';
var apiAiClient = require('apiai')(API_AI_TOKEN);
var request = require('request');
var User = require('../models/user');
var Mentor = require('../models/mentor');

var notPaused = function (recipientId, messageText) {
  var apiaiSession = apiAiClient.textRequest(messageText, {
    sessionId: recipientId
  });

  apiaiSession.on('response', function (response) {
    var language = '';
    messageText = response.result.fulfillment.speech;
    if (response.result.action === 'request-mentor') {
      language = response.result.parameters.language;
      var searchForMentor = require('../services/searchmentor');
      searchForMentor.searchForMentor(recipientId, language);
    } else if (response.result.action === 'add-mentor') {
      language = response.result.parameters.language;
      var saveMentor = require('../services/savementor');
      saveMentor.saveMentor(recipientId, language);
    } else if (response.result.action === 'live-agent') {
      User.findOneAndUpdate({
        facebookId : recipientId
      }, {$set: {pauseAI : true}},
      function (err, user) {
        if (err) {
          console.log(err);
        } else {
          sendMessengerResponse({
            recipient: {
              id: '1603837449659792'
            },
            message: {
              text: 'Please help ' + user.firstName + ' ' + user.lastName
            }
          });
        }
      });
    }

    sendMessengerResponse({
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

var paused = function (recipientId, messageText) {
  if (messageText.toLowerCase() === 'unpause') {
    User.findOneAndUpdate({
      facebookId : recipientId
    }, {$set: {pauseAI : false}},
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        User.update({
          facebookId : recipientId
        }, {$set: {convoId: ''}},
        function (err, raw) {
          if (err) {
            console.log(err);
          } else {
            if (user.type === 'mentor') {
              Mentor.findOneAndUpdate({
                facebookId : recipientId
              }, {$set: {available : true}},
              function (err, mentor) {
                if (err) {
                  console.log(err);
                } 
              });
            }
          }
          sendMessengerResponse({
            recipient: {
              id: recipientId
            },
            message: {
              text: 'Unpaused! Auto reply is turned back on.'
            }
          });
        });
      }
    });
  } else {
    User.findOne({
      facebookId : recipientId
    }, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        sendMessengerResponse({
          recipient: {
            id: user.convoId
          },
          message: {
            text: messageText
          }
        });
      }
    });
  }
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
      console.log('Message sent to ' + messageData.recipient.id);
    }
  });
};

module.exports = {
  notPaused : notPaused,
  paused : paused,
  sendMessengerResponse : sendMessengerResponse
};
