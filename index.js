var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

var facultyrouter = require('./routes/facultyrouter');
var studentrouter = require('./routes/studentrouter');
var feedbackrouter = require('./routes/feedbackrouter');
var userrouter = require('./routes/users');

var app = express();
app.listen(process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var mongoose = require('mongoose');

//mongoose.connect(process.env.mongoUrl);
mongoose.connect('mongodb://localhost:27017/lnm-feedback-portal');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log("Connected correctly to server");
});

app.use('/feedback', feedbackrouter);
app.use('/users', userrouter);
app.use('/faculty', facultyrouter);
app.use('/student', studentrouter);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500).json('error', {
				message: err.message,
				error: err
			});
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500)
			.json('error', {
				message: err.message,
				error: {}
			});
	});
}

module.exports = app;
