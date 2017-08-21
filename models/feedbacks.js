var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
  uid: {type: 'string', maxlength: 10, nullable: false},
  message: {type: 'string', maxlength: 1000, nullable: true},
  sender: {type: 'string', maxlength: 10, nullable: true},
  reciever: {type: 'string', maxlength: 10, nullable: true},
  feedback_id: {type: 'string', maxlength: 10, nullable: true},
},{
  timestamps: true
});


var feedbackSchema = new Schema({
  title: {type: 'string', maxlength: 100, nullable: true},
  message: {type: 'string', maxlength: 1000, nullable: true},
  faculty_id: {type: 'string', maxlength: 30, nullable: true},
  student_id: {type: 'string', maxlength: 30, nullable: true},
  subject: {type: 'string', maxlength: 20 , nullable: true},
  faculty_name: {type: 'string', maxlength: 20 , nullable: true},
  replies: [replySchema]
},{
  timestamps: true
});

var Feedbacks = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedbacks;
