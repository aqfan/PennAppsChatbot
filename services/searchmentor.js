const message = require('../routes/message');
const Mentor = require('../models/mentor');

var searchForMentor = function (recipientId, language) {
  Mentor.findOne({language: language, available: true}, function (err, user) {
    if (err) {
      console.log(err);
    } else if (user == null) {
      return message.sendMessengerResponse({
        recipient: {
          id: recipientId
        },
        message: {
          text: 'Sorry, there are no mentors available right now. Please check back again later.'
        }
      });
    } else {
      return message.sendMessengerResponse({
        recipient: {
          id: recipientId
        },
        message: {
          text: 'I have found a mentor for you. Please contact ' + user.firstName + ' ' + user.lastName
        }
      });
    }
  });
};

module.exports = {
  searchForMentor : searchForMentor
};
