var _ = require('underscore');
var youtube = require('modules/youtube');
var hackernews = require('modules/hackernews');


var requestNewContent = function(searchQuery) {
    var youtubeContent = youtube.search(searchQuery);
    var hackernewsContent = hackernews.search(searchQuery);
    
    return _.union(youtubeContent, hackernewsContent);
};


module.exports = function() {
    var populateNewContent = function() {
        var funnyContent = requestNewContent('funny');
        var newsContent = requestNewContent('new');
        var learningContent = requestNewContent('tutorial');
        // TODO: add to content collection
    };

    var getContentSuggestion = function(duration, contentVibe) {
        // TODO: get 5 content suggestions from model based on duration and
        // Vibe

    }
};