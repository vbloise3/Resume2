var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NpsclientSchema = new Schema({
  name: String,
  department: String,
  schedule: String,
  relationshipManager: String
});

module.exports = mongoose.model('Npsclient', NpsclientSchema);
