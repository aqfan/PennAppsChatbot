const User = require('../models/user');
const request = require('request');

module.exports = {
  getFacebookData : getFacebookData,
  saveUser : saveUser
};

// Get user data Messenger Platform User Profile API and save it on the MongoDB
var saveUser = function (facebookId, firstName, lastName) {

  getFacebookData (facebookId, function (err, userData) {
    var user = {
      facebookId : facebookId,
      firstName : firstName || userData.first_name,
      lastName : lastName || userData.last_name
    };

    User.collection.findOneAndUpdate({
      facebookId : facebookId
    }, user, {
      upsert : true
    }, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log('user saved');
      }
    });
  });
};

// Get User data from Messenger Platform User Profile API **NOT GRAPH API**
var getFacebookData = function (facebookId, callback) {
  return request({
    uri : 'https://graph.facebook.com/v2.6/' + facebookId,
    qs : {
      access_token : process.env.PAGE_ACCESS_TOKEN
    },
    method : 'GET'
  }, function (err, response, body) {
    var userData = null;
    if (err) {
      console.log(err);
    } else {
      userData = JSON.parse(response.body);
    }
    callback(err, userData);
  });
};
