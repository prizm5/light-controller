
var outlets = require('./outlets.json');
var codeSendPulseLength = "189";
var codeSendPIN = "0";

var exec = require('child_process').exec;

var sendCode = function (code) {
  var cmd = 'sudo ./codesend ' + code + ' -p ' + codeSendPIN + ' -l ' + codeSendPulseLength;
  console.log(cmd);
  exec(cmd, function callback(error, stdout, stderr) {
    if (error) {
      console.log('Error calling cmd: ', cmd, error);
    }
    else if (stderr) {
      console.log('Error calling cmd stderr: ', cmd, stderr);
    }
    else {
      console.log("cmd success: ", stdout)
    }



  });

}

exports.ToggleOn = function (id, state) {

  if (id == 6) {
    var o = outlets;
  }
  else {
    var o = outlets.filter(function (o) { return o.id == id; });
  }

  for (var i = 0; i < o.length; i++) {
    var outlet = o[i];
    console.log(id);
    console.log(outlet[state]);
    sendCode(outlet[state]);
  }
  return "success";
}
