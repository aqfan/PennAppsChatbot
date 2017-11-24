var request = require('request');

module.exports = function (sender) {
  request({
    uri: 'https://graph.facebook.com/v2.6/1456157567831462/thread_settings',
    qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: {
      setting_type:'call_to_actions',
      thread_state:'new_thread',
      call_to_actions:[
        {
          payload:'Greeting'
        }
      ]
    }
  }, function (error, response, body) {
    if (error) {
      console.log('Error sending messages: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
};
