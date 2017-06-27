const fs = require('file-system');

var easy = [];
var normal = [];
var hard = [];

const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

(function buildDifficulty(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].length >=4 && array[i].length <= 6) {
            easy.push(array[i]);
        }
        if (array[i].length >=6 && array[i].length <=8) {
            normal.push(array[i]);
        }
        if (array[i].length > 8) {
            hard.push(array[i]);
        }
    }
})(words);


module.exports = {

    easy: easy,
    normal: normal,
    hard: hard

};