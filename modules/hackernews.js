var _ = require('underscore');
var Provider = require('../models/providers');
var hn = require('hacker-news-api');

// returns an object compatible with ContentSuggenstion model
var convertToContentSuggestion = function(content, query) {
    return {
        title: content.title,
        contentType: "video",
        contentVibe: "funny", // TODO: make dynamic
        duration: 10, //content.contentDetails.duration, // TODO: fix this
        provider: Provider.findOne({name: 'HackerNews'}).id,
        previewImg: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg', // TODO: fix this
        tags: content.tags,
        url: content.url,
        publishedAt: content.createdAt
    }
};

module.exports = {

    search: function(query) {
        return new Promise(function(resolve, reject) {
            // TODO: reformat to array according to our JSON model
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
    },

    getById: function(id) {
        return new Promise(function(resolve, reject) {
            hn.story().item(id, function (error, data) {
                if (error) reject(error);
                else resolve(data);
            });
        });
    }
};