var express = require('express');
var ContentSuggestions = require('../models/contentSuggestions');
var router = express.Router();

router.get('/all', function(req, res, next) {
    res.render('all_content', { contentSuggestions: ContentSuggestions.find({}) });
});

module.exports = router;