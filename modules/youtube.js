var _ = require('underscore');
var Provider = require('../models/providers');
var YouTube = require('youtube-node');

var youTube = new YouTube();
youTube.setKey('AIzaSyAdmw53NwaktnXINZPXg4w05JKwgF6D8uE');
youTube.addParam('part', 'snippet,contentDetails');

// returns an object compatible with ContentSuggenstion model
var convertToContentSuggestion = function(content, query) {
    return {
        title: content.snippet.title,
        contentType: "video",
        contentVibe: "funny", // TODO: make dynamic
        duration: 10, //content.contentDetails.duration, // TODO: fix this
        provider: Provider.findOne({name: 'YouTube'}).id,
        previewImg: content.snippet.thumbnails.default.url,
        tags: content.snippet.tags, // TODO: fix this
        url: 'https://www.youtube.com/watch?v=' + content.id.videoId,
        publishedAt: content.snippet.publishedAt
    }
};

module.exports = {

    search: function (query) {
        return new Promise(function (resolve, reject) {
            youTube.search(query, 50, function (error, data) {
                if (error) reject(error);
                else {
                    var result = data.items.map(function (entry) {
                        return convertToContentSuggestion(entry, query);
                    });

                    resolve(result);
                }
            });
        });
    }
};