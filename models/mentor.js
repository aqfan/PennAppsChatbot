// Load mongoose since we need it to define a model
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MentorSchema = new Schema({
  facebookId : {
    type : String,
    required : true
  },
  language: String,
  available: Boolean,
  firstName : String,
  lastName : String
});

module.exports = mongoose.model('Mentor', MentorSchema);
