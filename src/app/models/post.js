var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
  Title: String,
  Body: String,
  UserId: String,
  Id: String
});

module.exports = mongoose.model('Post', PostSchema);
