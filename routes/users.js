var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');
var OtpGen = require('../services/OTP');
var mailer = require('../services/mailer');


router.post('/register', function(req, res) {
    var OTP = OtpGen.generateOTP();
    var password = OTP.toString();
    User.register(new User({ username : req.body.username }), password, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({err: err});
        }
        mailer.sendOTP(req.body.username,OTP);
        return res.status(200).json({status: 'Registration Successful!'});
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req,res,next);
},
function(err, req, res, next) {
    return res.status(500).send({'status':'err','message':err.message});
  });

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
