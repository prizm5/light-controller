
var outlets = require('./outlets.json');
var codeSendPulseLength = "189";
var codeSendPIN = "0";

var sendCode = function (code) {
  console.log('./codesend ' + code + ' -p ' + codeSendPIN + ' -l ' + codeSendPulseLength);
}


exports.ToggleOn= function(id, state) {
  var outlet = outlets.filter(function (o) { return o.id == id; })[0];
  console.log(id);
  console.log(outlet[state]);
  sendCode(outlet[state]);
  return "success";
}
