var hn = require('hacker-news-api');

module.exports = function() {
    var search = function(query) {
        hn.story().search(query).since('past_24h', function (error, data) {
            if (error)
                console.log(error);
            else
                // TODO: reformat to array according to our JSON model
                return data;
        });
    };

    var getById = function(id) {
        hn.story().item(id, function (error, data) {
            if (error)
                console.log(error);
            else
                // TODO: reformat to array according to our JSON model
                return data;
        });
    };
};