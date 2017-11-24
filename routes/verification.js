module.exports = function (req, res) {
  if (req.query['hub.verify_token'] === 'process.env.VERIFICATION_TOKEN') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
};
