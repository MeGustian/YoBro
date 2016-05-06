var _ = require('underscore');
var Provider = require('../models/providers');
var hn = require('hacker-news-api');

// returns an object compatible with ContentSuggenstion model
var convertToContentSuggestion = function(content, query) {
    return {
        title: content.title,
        contentType: "news",
        contentVibe: ["funny", "news", "learning"][Math.floor(Math.random() * 2)], // TODO: make dynamic
        duration: Math.floor((Math.random() * 15) + 1), //content.contentDetails.duration, // TODO: fix this
        provider: Provider.findOne({name: 'HackerNews'}).id,
        previewImg: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg', // TODO: fix this
        tags: content.tags,
        url: content.url,
        publishedAt: content.createdAt
    };
};

module.exports = {

    search: function(query) {
        return new Promise(function(resolve, reject) {
            hn.story().search(query).since('past_24h', function (error, data) {
                if (error) reject(error);
                else {
                    var result = data.hits.map(function(entry) {
                        return convertToContentSuggestion(entry, query);
                    });

                    resolve(result);
                }
            });
        });
    }
};