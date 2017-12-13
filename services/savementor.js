const User = require('../models/user');
const Mentor = require('../models/mentor');

// Get user data Messenger Platform User Profile API and save it on the MongoDB
var saveMentor = function (facebookId, language) {
  User.findOneAndUpdate({facebookId : facebookId},
    {$set: {type: 'mentor'}}, function (err, userData) {
      if (err) {
        console.log(err);
      } else {
        var mentor = {
          facebookId : facebookId,
          language : language,
          available: true,
          firstName : userData.firstName,
          lastName : userData.lastName
        };

        Mentor.collection.findOneAndUpdate({
          facebookId : facebookId
        }, mentor, {
          upsert : true
        }, function (err, user) {
          if (err) {
            console.log(err);
          } else {
            console.log('mentor saved');
          }
        });
      }

    });
};

module.exports = {
  saveMentor : saveMentor
};
