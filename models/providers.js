var mongoose = require('mongoose');

var providerSchema = mongoose.Schema({
    name: String,
    baseUrl: String,
    logoImg: String
});

module.exports = mongoose.model('Provider', providerSchema);