var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    type: {type: String, enum: ['student','faculty','admin'], nullable: true},
    user_id: {type: 'String', maxlength: 40, nullable: true}
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
