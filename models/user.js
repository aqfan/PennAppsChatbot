// Load mongoose since we need it to define a model
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    facebookId: {type: String, required: true},
    firstName: String,
    lastName: String
})

module.exports = mongoose.model('User', UserSchema);
