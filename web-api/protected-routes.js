var express = require('express');
var jwt     = require('express-jwt');

var app = module.exports = express.Router();
var mqhost = process.env.MQHOST || "127.0.0.1";
RedisSMQ = require("rsmq");
var rsmq = new RedisSMQ({ host: mqhost, port: 6379, ns: "rsmq" });
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

var sendMessage = (id, action) => {
	var msg = JSON.stringify({ id: id, action: action });
  return rsmq.sendMessage({ qname: "myqueue", message: msg }, 
    (err, resp) => {
      if (resp) { 
        console.log("Message sent. ID:", resp); 
        return true;
      }
      else { return false; }
	});
}

app.post('/api/protected/toggle', (req, res) => {
  var body = req.body;
  var msg = JSON.stringify({id: body.id, action: body.state});
  if(body.id == 6) {
    for (let index = 1; index < 6; index++) {
      sendMessage(index, body.action);
    }
  }
  else {
    sendMessage(body.id, body.action);
  }
  res.status(200).send("success");
});
