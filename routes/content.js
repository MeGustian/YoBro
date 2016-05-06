var express = require('express');
var ContentSuggestions = require('../models/contentSuggestions');
var router = express.Router();

router.get('/all', function(req, res, next) {
    var contentSuggestions = [];
    ContentSuggestions.find({}).exec(function(err, data) {
        if (err) console.log('error finding content');
        else contentSuggestions = data;
        
        res.render('all_content', { contentSuggestions: contentSuggestions });
    });
});

module.exports = router;

router.get('/decision', function(req, res, next) {
    var content = [];
    var duration = req.params.duration;
    var contentVibe = req.params.contentVibe;
    ContentSuggestions.find({'contentVibe' : contentVibe}).where(duration).ls(duration).gt(duration * 0.8).exec(function (err, data) {
        if (err) console.log('error finding content');
        else content = data;

        res.render('some_content', { contentSuggestions: content });
    });


});
