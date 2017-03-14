var express = require('express'),
  quoter = require('./quoter');
  toggler = require('./toggler');

var app = module.exports = express.Router();

app.post('/api/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});

app.post('/api/toggle', function (req, res) {
  var body = req.body;
  res.status(200).send(toggler.ToggleOn(body.id, body.state));
});
