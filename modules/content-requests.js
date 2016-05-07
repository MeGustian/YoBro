var _ = require('underscore');

var ContentSuggestion = require('../models/contentSuggestions');
var Provider = require('../models/providers');

var hackernews = require('./hackernews');
var youtube = require('./youtube');


var requestNewContent = function(searchQuery) {
    return new Promise(function(resolve, reject) {
        var youtubeContent = youtube.search(searchQuery);
        //var hackernewsContent = hackernews.search(searchQuery);

        Promise.all([youtubeContent]).then(function(dataArr) {
            var content = _.flatten(dataArr);

            if (content.length > 0) {
                resolve(content);
            }
            else {
                reject(Error("requestNewContent failed."));
            }
        }, function(reason) {
            console.log(reason);
        });
    });
};


module.exports = {

    populateNewContent: function() {
        var funnyContent = requestNewContent('funny');
        var newsContent = requestNewContent('new');
        var learningContent = requestNewContent('tutorial');

        Promise.all([funnyContent, newsContent, learningContent]).then(function (dataArr) {
            var data = _.flatten(dataArr);

            // add to content collection
            var counter = 0;
            data.forEach(function(content, index) {
                ContentSuggestion.create(content, function(err) {
                    if (err) {
                        console.log("error inserting content suggestion: " + err);
                    }
                    else {
                        counter++;
                    }

                    // on last iteration, print how many documents were stored
                    if (index == data.length -1) {
                        //console.log('%d content suggestions successfully stored.', counter);
                    }
                });
            });
        }, function(reason) {
            console.log(reason);
        });
    }
};