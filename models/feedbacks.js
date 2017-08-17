var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  uid: {type: 'string', maxlength: 10, nullable: false},
  message: {type: 'string', maxlength: 1000, nullable: true},
  faculty_id: {type: 'string', maxlength: 10, nullable: true},
  student_id: {type: 'string', maxlength: 10, nullable: true},
  type: {type: 'string', maxlength: 10, nullable: true},
},{
  timestamps: true
});

var Feedbacks = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedbacks;
