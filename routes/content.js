var express = require('express');
var ContentSuggestions = require('../models/contentSuggestions');
var User = require('../models/users');
var router = express.Router();
var async = require('async');

router.get('/all', function(req, res, next) {
    var contentSuggestions = [];
    ContentSuggestions.find({}).exec(function(err, data) {
        if (err) console.log('error finding content');
        else contentSuggestions = data;
        
        res.render('all_content', { contentSuggestions: contentSuggestions });
    });
});


router.get('/decision', function(req, res, next) {
    var content = [];
    var calls = [];
    var duration = Number(req.headers.duration);
    var contentVibe = req.headers.contentvibe;
    var username = req.headers.username;
    var userContent =  [];
    var foundContent = false;
    var foundUserContent = false;
    ContentSuggestions.find({'contentVibe': contentVibe}).where('duration').lt(duration + 1).gt(duration * 0.8).exec(function(err, data) {
        if (err) console.log('error finding content');
        else content = data;

        //res.render('some_content', { contentSuggestions: content });
        foundContent = true;
        User.find({'local.username' : username}).exec(function(err, data) {
            if (err) console.log('error finding user content');
            else userContent = data;
            foundUserContent = true;
            //res.render('some_content', { contentSuggestions: userContent });

            //console.log(userContent[0].tagpool);

            var bestContent = FindBestVideo(content, userContent[0].tagpool);
            //console.log(bestContent);
            res.send({ contentArr: bestContent });
        });
    });






});

module.exports = router;

function FindBestVideo(content, tagpool) {

    var bestFiveContents = [];
    var bestFiveScores = [];
    var counter = 0;
    var minScore = 100000;
    var minScoreIndex = 0;
    var currScore = 0;
    var c, t, i;
    for (c = 0; c < content.length; c++) {
        var currTags = content[c]._doc.tags;
        for (t= 0; t < currTags.length; t++) {
            currScore += Number(tagpool[currTags[t]]);
        }
        if (counter < 4) {
            bestFiveContents[counter] = content[c]._doc;
            bestFiveScores[counter] = currScore;
            if (currScore < minScore) {
                minScore = currScore;
                minScoreIndex = counter;
            }
            counter++;
        } else {
            if (currScore > minScore) {
                bestFiveContents[minScoreIndex] = content[c]._doc;
                bestFiveScores[minScoreIndex] = currScore;
                minScore = 100000;
                for (i = 0; i < 5; i++) {
                    if (bestFiveScores[i] < minScore) {
                        minScore = bestFiveScores[i];
                        minScoreIndex = i;
                    }
                }
            }
        }
    }
    return bestFiveContents;

}