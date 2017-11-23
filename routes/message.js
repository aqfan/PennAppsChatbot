var request = require('request');

function processMessage (event) {
    console.log(event.message.text);
    sendMessengerTextMessage(event.sender.id, event.message.text);
}

// creates message object
function sendMessengerTextMessage(recipientId, messageText) {
  return sendMessengerResponse({
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  });
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
