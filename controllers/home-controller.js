const express = require('express');
const router = express.Router();
const words = require('../models/words')

router.get('/', (request, response) => {
    if (request.session.isCurrent != true) {
        response.render('index');
    } else {
        var model = request.session;
        response.render('game', model);
    }
});

router.post('/', (request, response) => {
    if (request.body.difficulty = 0) {
        request.session.chosenWord = words.easy[Math.floor(Math.random() * (words.easy.length))];
    } else if (request.body.difficulty = 1) {
        request.session.chosenWord = words.normal[Math.floor(Math.random() * (words.normal.length))];
    } else if (request.body.difficulty = 0) {
        request.session.chosenWord = words.hard[Math.floor(Math.random() * (words.hard.length))];
    }
    request.session.displayWord = [];
    for (i = 0; i < request.session.chosenWord.length; i++) {
        request.session.displayWord.push("_");
    }
    request.session.incorrectGuesses = 8;
    request.session.allGuesses = [];
    request.session.isCurrent = true;
    request.session.numCorrectLetters = 0;
    console.log(request.session.chosenWord);
    var model = request.session
    response.render('game', model)
})

module.exports = router;