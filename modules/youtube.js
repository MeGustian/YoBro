var YouTube = require('youtube-node');

var youTube = new YouTube();
youTube.setKey('API_KEY'); // TODO: add API key

module.exports = function() {

    var search = function (query) {
        youTube.search(query, 200, function (error, result) {
            if (error) {
                console.log(error);
                return null;
            }
            else {
                // TODO: reformat to array according to our JSON model
                return result;
            }
        });
    };

    var getById = function(videoId) {
        youTube.getById(videoId, function(error, result) {
            if (error) {
                console.log(error);
                return null;
            }
            else {
                // TODO: reformat to array according to our JSON model
                return result;
            }
        });
    }
};