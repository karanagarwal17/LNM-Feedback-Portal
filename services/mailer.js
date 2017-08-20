var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'feedbacklnmiit@gmail.com',
    pass: 'helloworld12345'
  },
  tls: {rejectUnauthorised: false}
}));

exports.sendOTP = function( sendTo , OTP ){
  let mailOptions = {
    from: '"Feedback LNMIIT" <feedbacklnmiit@gmail.com>',
    to: sendTo,
    subject: 'OTP for logging into feedback portal',
    text: 'The OTP for your feedback portal is ' + OTP + '. This will be valid for 1 hour only.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log('Message %s sent %s', info.messageId, info.response);
  });
}

exports.replyRecieved = function( sendTo ){
  let mailOptions = {
    from: '"Feedback LNMIIT" <feedbacklnmiit@gmail.com>',
    to: sendTo,
    subject: 'You have recieved a reply',
    text: 'You have a new reply for the feedbacks you submitted. Kindly visit the portal to view the same.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log('Message %s sent %s', info.messageId, info.response);
  });
}

exports.feedbackConfirmation = function( sendTo ){
  let mailOptions = {
    from: '"Feedback LNMIIT" <feedbacklnmiit@gmail.com>',
    to: sendTo,
    subject: 'Your feedback has been submitted',
    text: 'Thank you for submitting a feedback on the Feedback Portal.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error);
    }
    console.log('Message %s sent %s', info.messageId, info.response);
  });
}
