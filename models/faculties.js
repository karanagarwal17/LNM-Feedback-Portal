var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var facultySchema = new Schema({
  name: {type: 'string', maxlength: 100, nullable: false},
  gender: {type: 'string', maxlength: 10, nullable: true},
  email_id: {type: 'string', maxlength: 30, nullable: true},
  department: {type: 'string', maxlength: 10, nullable: true},
  hod: {type: 'boolean'},
  year: {type: 'string', nullable: true},
  subjects: {type: [String]}
},{
  timestamps: true
});

var Faculties = mongoose.model('Faculty',facultySchema);

module.exports = Faculties;
