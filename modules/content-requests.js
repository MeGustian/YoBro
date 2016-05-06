var _ = require('underscore');

var ContentSuggestion = require('../models/contentSuggestions');
var Provider = require('../models/providers');

var youtube = require('./youtube');
var hackernews = require('./hackernews');
 

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
        var contentArray = _.union(funnyContent, newsContent, learningContent);

        // add to content collection
        ContentSuggestion.collection.insert(contentArray, function(err, data) {
           if (err) {
               console.log("error inserting content suggestions:\n" + err);
           }
           else {
               console.info('%d content suggestions successfully stored.', data.length);
           }
        });
    };

    // returns 5 content suggestions from model based on duration and Vibe
    var getContentSuggestion = function(duration, contentVibe) {
        ContentSuggestion
            .find({duration: duration, contentVibe: contentVibe})
            .limit(5)
            .exec(function(err, contentSuggestions) {
                if (err) {
                    console.log(err);
                }
                else {
                    return contentSuggestions;
                }
            });
    }
};