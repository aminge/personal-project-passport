var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dataRoute = require('./routes/data');

var passport = require('./strategies/user.js');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration //
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: 'true',
    saveUninitialized: false,
    cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/', index);
app.use('/data', dataRoute);

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});