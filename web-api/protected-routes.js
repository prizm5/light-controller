var express = require('express');
var jwt     = require('express-jwt');

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
