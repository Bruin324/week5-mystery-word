const express = require('express');
const router = express.Router();
const jsonfile = require('jsonfile')
const fs = require('file-system');
const winnersList = require('../models/winners.json')
const filepath = '../models/winners.json';

router.get('/game-won', (request, response) => {
    if (request.session.isCurrent != true) {
        var model = request.session;
        response.render('game-won', model)
    } else {
        response.redirect('/');
    }
});

router.get('/winners', (request,response) => {
    response.render('winners', {winnersList: winnersList});
});

router.post('/winners', (request, response) => {
    if (request.session.isCurrent != true) {
        var newWinner = { name: request.body.winner, guesses: request.session.incorrectGuesses, word: request.session.chosenWord };
        if (winnersList.length === 0) {
            winnersList.push(newWinner);
        } else {
            for (i = 0; i < winnersList.length; i++) {
                if (newWinner.guesses > winnersList[i].guesses || (newWinner.guesses === winnersList[i].guesses && newWinner.word < winnersList[i].word)) {
                    index = i;
                    break;
                } else {
                    index = i + 1;
                }
            }
            winnersList.splice(index, 0, newWinner);
        }
        var winJSON = JSON.stringify(winnersList);
        fs.writeFile(filepath, winJSON, function (err) { });
        response.render('winners', { winnersList: winnersList });
    } else {
        response.redirect('/');
    }
})

router.get('/game-lost', (request, response) => {
    var model = request.session;
    response.render('game-lost', model)
})

module.exports = router;