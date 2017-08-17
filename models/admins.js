var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  id: {type: 'string', maxlength: 10, nullable: true},
  name: {type: 'string', maxlength: 100, nullable: false},
  gender: {type: 'string', maxlength: 10, nullable: true},
  email_id: {type: 'string', maxlength: 30, nullable: true}
},{
  timestamps: true
});

var Admins = mongoose.model('Admin',adminSchema);

module.exports = Admins;
