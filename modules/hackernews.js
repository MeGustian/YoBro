var _ = require('underscore');
var Provider = require('../models/providers');
var htmlParsing = require('./html-parsing');
var hn = require('hacker-news-api');

// returns an object compatible with ContentSuggenstion model
var convertToContentSuggestion = function(content, query) {
    return {
        title: content.title,
        contentType: "news",
        contentVibe: ["funny", "news", "learning"][Math.floor(Math.random() * 2)], // TODO: make dynamic
        provider: Provider.findOne({name: 'HackerNews'}).id,
        previewImg: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg', // TODO: fix this
        url: content.url,
        publishedAt: content.created_at
    }
};

module.exports = {

    search: function(query) {
        return new Promise(function(resolve, reject) {
            hn.story().search(query).since('past_24h', function (error, data) {
                if (error) reject(error);
                else {
                    var promises = [];
                    if (typeof data.hits != 'object' || data.hits.length == 0)
                        reject("no values returned from hackernews");
                    else {
                        data.hits.forEach(function (entry, index) {
                            var promise = htmlParsing.getInfo(entry.url);
                            promises.push(promise);

                            if (index == data.hits.length - 1) {
                                Promise.all(promises).then(function (dataArr) {
                                    if (typeof dataArr != 'object' || dataArr.length == 0)
                                        reject();
                                    else {
                                        var result = [];
                                        dataArr.forEach(function (data, dataIndex) {
                                            var suggestion = convertToContentSuggestion(entry[dataIndex], query);
                                            suggestion.duration = data.duration;
                                            var tags = [];
                                            var finish = data.tags.length == 0;

                                            data.tags.forEach(function (categories, index) {
                                                if (categories.hasOwnProperty('category_list')) {
                                                    tags.push(categories.category_list.map(function (category) {
                                                        return category.label;
                                                    }));
                                                }

                                                if (index == data.tags.length - 1) {
                                                    suggestion.tags = _.flatten(tags);
                                                    result.push(suggestion);
                                                    finish = true;
                                                }
                                            });

                                            if (dataIndex == dataArr.length - 1 && finish) {
                                                resolve(result);
                                            }
                                        });
                                    }
                                }, function(reason) {
                                    console.log(reason);
                                    reject();
                                });
                            }
                        });
                    }
                }
            });
        });
    }
};