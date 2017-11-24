var message = require('./message');
var postback = require('./postback');

module.exports = (req, res) => {
  var data = req.body;
  if (data.object === 'page') {
    data.entry.forEach(function (entry) {
      if (entry.messaging) {
        entry.messaging.forEach(function (event) {
          if (event.message) {
            message.processMessage(event);
          } else if (event.postback) {
            postback.processPostback(event);
          }
        });
      }
    });

    res.sendStatus(200);
  }
};
