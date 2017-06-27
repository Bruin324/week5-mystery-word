const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator')

let chosenWord = '';
let allGuesses = [];
let incorrectGuesses = 8;

router.get('/game', (request, response) => {
    if (request.session.isCurrent) {
        var model = request.session;
        response.render('game', model);
    } else {
        response.redirect('/');
    }
});

router.use(expressValidator({
    customValidators: {
        alreadyGuessed: function (guess, allGuesses) {
            return (allGuesses.indexOf(guess.toLowerCase()) === -1);
        }
    }
}))

router.post('/game', (request, response) => {
    request.session.isCurrent = false;
    var model = request.session
    var guess = request.body.guess.toLowerCase();
    chosenWord = model.chosenWord;
    request.checkBody('guess', 'Please only guess letters').isAlpha();
    request.checkBody('guess', 'Please guess only one letter at a time').len(1, 1);
    request.checkBody('guess', 'You\'ve already guessed that letter').alreadyGuessed(model.allGuesses);
    model.error = request.validationErrors();
    if (!model.error) {
        if (chosenWord.indexOf(guess) != -1) {
            model.allGuesses.push(guess);
            for (i = 0; i < chosenWord.length; i++) {
                if (model.chosenWord[i] === guess) {
                    model.displayWord.splice(i, 1, guess);
                    model.numCorrectLetters++;
                }
            }
            if ((model.numCorrectLetters) === chosenWord.length) {
                request.session.isCurrent = false;
                response.redirect('game-won');
                return;
            }
        } else {
            model.allGuesses.push(guess);
            model.incorrectGuesses--;
            if (model.incorrectGuesses <= 0) {
                request.session.isCurrent = false;
                response.redirect('game-lost');
                return;
            }
        }
        // response.render('game', model)
    }
    response.render('game', model);
})

module.exports = router;