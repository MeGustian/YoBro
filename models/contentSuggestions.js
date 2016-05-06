var mongoose = require('mongoose');

var contentSuggestionSchema = mongoose.Schema({
    title: String,
    contentType: String,
    contentVibe: String,
    duration: Number,
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    },
    previewImg: String,
    tags: Array,
    url: String,
    publishedAt: Date
});

module.exports = mongoose.model('ContentSuggestion', contentSuggestionSchema);