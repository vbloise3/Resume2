var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ElementSchema   = new Schema({
  Position: String,
  Name: String,
  Weight: String,
  Symbol: String
});

module.exports = mongoose.model('Element', ElementSchema);
