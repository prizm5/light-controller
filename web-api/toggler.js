
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
      console.log("cmd success: ", stdout);
    }


    
  });

}


exports.ToggleOn = function (id, state) {
  var outlet = outlets.filter(function (o) { return o.id == id; })[0];
  console.log(id);
  console.log(outlet[state]);
  sendCode(outlet[state]);
  return "success";
}
