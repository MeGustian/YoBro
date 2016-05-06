var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    title: String,
    contentType: String,
    contentVibe: String,
    duration: Number,
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    },
    previewImg: String
});

module.exports = mongoose.model('ContentSuggestion', userSchema);