const path = require('path')
var express       = require('express');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var dotenv        = require('dotenv'),
    cors          = require('cors'),
    http          = require('http');

// Passport is the most popular Node Js authentication library
var passport = require('passport');
// We are including the Auth0 authentication strategy for Passport
var Auth0Strategy = require('passport-auth0');

dotenv.load();
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('./protected-routes'));
app.use(require('./user-routes'));

const publicPath = express.static(path.join(__dirname, 'dist'))
const indexPath = path.join(__dirname, '/dist/index.html')
app.use('/', publicPath)
app.get('/index.html', function (_, res) { res.sendFile(indexPath) })
app.get('/login', function (_, res) { res.sendFile(indexPath) })
app.get('/home', function (_, res) { res.sendFile(indexPath) })

var cleanse = function (res) {
  res.removeHeader('Access-Control-Allow-Origin');
  res.removeHeader('Connection');
  res.removeHeader('Content-Length');
  res.removeHeader('Date');
  res.removeHeader('Transfer-Encoding');
  res.removeHeader('X-Powered-By');
}
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  cleanse(res);
  res.status(404).send();
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  cleanse(res);
  res.status(500).send();
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
