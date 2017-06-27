const express = require('express');
const router = express.Router();
const dictionary = require('../models/dictionary')

router.get('/', (request, response) => {
    if (request.session.isCurrent != true) {
        response.render('index');
    } else {
        var model = request.session;
        response.render('game', model);
    }
});

router.post('/', (request, response) => {
    console.log(request.body.difficulty);
    if (request.body.difficulty === '0') {
        console.log('get easy');
        request.session.chosenWord = dictionary.easy[Math.floor(Math.random() * (dictionary.easy.length))];
    } else if (request.body.difficulty === '1') {
        console.log('get normal');
        request.session.chosenWord = dictionary.normal[Math.floor(Math.random() * (dictionary.normal.length))];
    } else if (request.body.difficulty === '2') {
        console.log('get hard');
        request.session.chosenWord = dictionary.hard[Math.floor(Math.random() * (dictionary.hard.length))];
    }
    request.session.displayWord = [];
    for (i = 0; i < request.session.chosenWord.length; i++) {
        request.session.displayWord.push("_");
    }
    request.session.incorrectGuesses = 8;
    request.session.allGuesses = [];
    request.session.numCorrectLetters = 0;
    console.log(request.session.chosenWord);
    var model = request.session
    response.render('game', model)
})

module.exports = router;