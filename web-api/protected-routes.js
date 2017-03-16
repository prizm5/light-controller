var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    quoter  = require('./quoter');
    toggler = require('./toggler');
    jwksRsa = require('jwks-rsa');
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: 'https://' + process.env.AUTH0_DOMAIN + '/',
  algorithms: ['RS256']
});

app.use('/api/protected', jwtCheck);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    res.status(401).json({ message: 'Missing or invalid token' });
  }
  if (err.status == 404) {
    console.log(err);
    res.status(404).json({ message: 'Page Not Found' });
  }
});

app.get('/api/protected/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});

app.post('/api/protected/toggle', function (req, res) {
  var body = req.body;
  res.status(200).send(toggler.ToggleOn(body.id, body.state));
});
