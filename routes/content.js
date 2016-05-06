var express = require('express');
var ContentSuggestions = require('../models/contentSuggestions');
var router = express.Router();

router.get('/all', function(req, res, next) {
    var contentSuggestions = [];
    ContentSuggestions.find({}).exec(function(err, data) {
        if (err) console.log('error finding content');
        else contentSuggestions = data;
    });
    
    res.render('all_content', { contentSuggestions: contentSuggestions });
});

module.exports = router;