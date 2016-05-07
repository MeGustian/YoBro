var http = require("http");
var url = require("url");
var htmlparser = require("htmlparser2");


module.exports = {

    getInfo: function(contentUrl) {
        var wordCounter = 0;
        var tags = [];

        return new Promise(function(resolve, reject) {
            var urlParts = url.parse(contentUrl);
            var options = {
                host: urlParts.hostname,
                path: urlParts.pathname,
                method: 'GET'
            };

            var htmlText = "";

            http.get(options, function(res) {
                var htmlText = '';
                res.setEncoding('utf8');

                res.on('data', function(chunk) {
                    htmlText += chunk;
                });

                res.on('end', function() {
                    var parser = new htmlparser.Parser({
                        onopentag: function(name, attribs){
                            if(name === "meta" && attribs.type === "keywords"){
                                attribs.content.replace(/,/, ' ').split(' ').forEach(function(keyword) {
                                    tags.push(keyword);
                                });
                            }
                        },
                        ontext: function(text){
                            wordCounter += text.split(' ').length;
                        },
                        onend: function() {
                            var result = {
                                wordCount: wordCounter,
                                tags: tags
                            };

                            resolve(result);
                        }
                    }, {decodeEntities: true});

                    parser.write(htmlText);
                    parser.end();
                });
            }).on('error', function(e) {
                reject("Got error: " + e.message);
            });
        });
    }
}