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
            res.render('some_content', { contentSuggestions: userContent });

            console.log(userContent[0].tagpool);

            FindBestVideo(content[0], userContent[0].tagpool);
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
    for (c in content) {
        var currScore;
        for (t in c.tags) {
            currScore += Number(tagpool[t]);
        }
        if (counter < 5) {
            bestFiveContents[counter] = c;
            bestFiveScores[counter] = currScore;
            if (currScore < minScore) {
                minScore = currScore;
                minScoreIndex = counter;
            }
            counter++;
        } else {
            if (currScore > minScore) {
                bestFiveContents[minScoreIndex] = c;
                bestFiveScores[minScoreIndex] = currScore;
                minScore = 100000;
                for (int = 0; i < 5; i++) {
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