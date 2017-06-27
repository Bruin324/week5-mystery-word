const fs = require('file-system');

var easy = [];
var normal = [];
var hard = [];

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

(function determineMode(words) {
    for (var i = 0; i < words.length; i++) {
        if (words[i].length >=4 && words[i].length <= 6) {
            easy.push(words[i]);
        }
        if (words[i].length >=6 && words[i].length <=8) {
            normal.push(words[i]);
        }
        if (words[i].length >= 8) {
            hard.push(words[i]);
        }
    }
})(words);


module.exports = {

    easy: easy,
    normal: normal,
    hard: hard

};