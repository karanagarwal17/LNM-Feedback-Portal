var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  name: {type: 'string', maxlength: 100, nullable: false},
  gender: {type: 'string', maxlength: 10, nullable: true},
  roll_no: {type: 'string', maxlength: 10, nullable: true},
  email_id: {type: 'string', maxlength: 30, nullable: true}
},{
  timestamps: true
});

var Students = mongoose.model('Student',studentSchema);

module.exports = Students;
