var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    baseUrl: String,
    logoImg: String
});

module.exports = mongoose.model('Provider', userSchema);