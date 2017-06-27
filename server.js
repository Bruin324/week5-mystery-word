//need to:
//  -hard mode - winner image


console.log('application has started')
const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const words = require ('./models/words')

const homeController = require('./controllers/home-controller')
const gameController = require('./controllers/game-controller')
const finishController = require('./controllers/finish-controller')

const application = express();
application.engine('mustache', mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(express.static(__dirname + '/public'));
application.use(bodyParser.urlencoded());
application.use(session({
    secret: 'whisper',
    resave: false,
    saveUninitialized: true
}));
application.use(homeController);
application.use(gameController);
application.use(finishController);

application.listen(3000);