var User = require('../models/user');

exports.generateOTP = function(){
  var OTP = (Math.random()*1000000);
  var OTP = Math.round(OTP) % 1000000;
  return OTP;
}
