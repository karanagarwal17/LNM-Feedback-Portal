var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
  id: {type: 'string', maxlength: 10, nullable: true},
  name: {type: 'string', maxlength: 30, nullable: true},
  faculty_id: {type: 'string', maxlength: 10, nullable: true},
  course_code: {type: 'string', maxlength: 10, nullable: true},
  type: {type: 'string', maxlength: 10, nullable: true}
},{
  timestamps: true
});

var Courses = mongoose.model('Course',courseSchema);

module.exports = Courses;
