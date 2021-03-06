var express = require('express');
var jwt     = require('express-jwt');
var outlets = require('./outlets.json');

var app = module.exports = express.Router();

RedisSMQ = require("rsmq");
rsmq = new RedisSMQ({ host: "127.0.0.1", port: 6379, ns: "rsmq" });
rsmq.createQueue({ qname: "myqueue" }, (err, resp) => {
	if (resp === 1) {
		console.log("queue created")
	}
});

var jwtCheck = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: 'https://' + process.env.AUTH0_DOMAIN + '/',
  algorithms: ['RS256']
});

app.use('/api/protected', jwtCheck);
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    res.status(401).json({ message: 'Missing or invalid token' });
  }
  if (err.status == 404) {
    console.log(err);
    res.status(404).json({ message: 'Page Not Found' });
  }
  console.log('auth loop');
});

app.post('/api/protected/toggle', (req, res) => {
    var body = req.body;
    var msg = JSON.stringify({id: body.id, action: body.state});
    rsmq.sendMessage({ qname: "myqueue", message: msg }, (err, resp) => {
      if (resp) {
        console.log("Message sent. ID:", resp);
      }
    }); 
  res.status(200).send("success");
});

let convertLightnameToId = (str) => {
  console.log('light name: ', str);
  var val = str.substring(0,20)
                .trim()
                .toLowerCase()
                .replace('the','')
                .split(' ')
                .join('');
  console.log('trimmed name: ', val);
  let plugs =  outlets.filter(function (o) {
    return o.name === val;
  });
  if(plugs.length > 0 ){
    return plugs[0].id;  
  }
  return 0;
};

var apikey = process.env.apikey;
app.post('/api/secure/toggle', (req, res) => {
  var key = req.query.apikey;
  if(!key || key.substring(0,40) !== apikey){
    console.log('invalid api key', req.query.apikey);
    res.status(404).send("unauthorized");
  } 
  else {
    var body = req.body;
    var lightId = convertLightnameToId(body.name);
    var msg = JSON.stringify({id: lightId, action: body.state});
    rsmq.sendMessage({ qname: "myqueue", message: msg }, (err, resp) => {
      if (resp) {
        console.log("Message sent. ID:", resp);
      }
    }); 
    res.status(200).send("success");
  }
});