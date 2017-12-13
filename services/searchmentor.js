const message = require('../services/parsemessages');
const Mentor = require('../models/mentor');
const User = require('../models/user');

var searchForMentor = function (recipientId, language) {
  Mentor.findOneAndUpdate({language: language, available: true},
    {$set: {available : false}},
    function (err, mentor) {
      if (err) {
        console.log(err);
      } else if (mentor == null) {
        return message.sendMessengerResponse({
          recipient: {
            id: recipientId
          },
          message: {
            text: 'Sorry, there are no mentors available right now. Please check back again later.'
          }
        });
      } else {
        User.update({facebookId: mentor.facebookId},
          {$set: {pauseAI: true, convoId: recipientId}}, function (err, user) {
            if (err) {
              console.log(err);
            } else {
              console.log('paused user');
            }
          });

        User.findOneAndUpdate({facebookId: recipientId},
          {$set: {pauseAI: true, convoId: mentor.facebookId}},
          function (err, user) {
            if (err) {
              console.log(err);
            } else {

              message.sendMessengerResponse({
                recipient: {
                  id: recipientId
                },
                message: {
                  text: 'I have connected you with ' + mentor.firstName + ' ' + mentor.lastName
                }
              });
              message.sendMessengerResponse({
                recipient: {
                  id: mentor.facebookId
                },
                message: {
                  text: 'Hello! I have connected you with ' + user.firstName + ' ' + user.lastName
                }
              });
            }
          });
      }
    });
};

module.exports = {
  searchForMentor : searchForMentor
};
