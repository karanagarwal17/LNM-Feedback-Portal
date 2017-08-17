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

var Replies = mongoose.model('Reply',replySchema);

module.exports = Replies;
