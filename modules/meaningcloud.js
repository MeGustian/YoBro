var qs = require("querystring");
var http = require("http");

var textClassification = function(contentUrl) {
    var options = {
        "method": "POST",
        "hostname": "api.meaningcloud.com",
        "port": null,
        "path": "/class-1.1",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        }
    };

    return new Promise(function(resolve, reject) {
        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                var res = JSON.parse(body.toString());
                resolve(res);
            });
        });

        req.write(qs.stringify({
            key: '50d8a81520f37dbb1470e819a07b0e3a',
            url: contentUrl,
            model: 'IPTC_en'
        }));
        req.end();
    });
};

var textProofreading = function(contentUrl) {
    var options = {
        "method": "POST",
        "hostname": "api.meaningcloud.com",
        "port": null,
        "path": "/stilus-1.2",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        }
    };

    return new Promise(function(resolve, reject) {
        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                var res = JSON.parse(body.toString());
                resolve(res);
            });
        });

        req.write(qs.stringify({
            key: '50d8a81520f37dbb1470e819a07b0e3a',
            lang: 'en',
            url: contentUrl
        }));
        req.end();
    });
};

module.exports = {
    getTextData: function(contentUrl) {
        return Promise.all([textClassification(contentUrl)]);//,
        // textProofreading(contentUrl)]);
    }
};