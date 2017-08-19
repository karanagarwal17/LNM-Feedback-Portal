var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var config = require('./config');

var loginrouter = require('./routes/loginrouter');
var logoutrouter = require('./routes/logoutrouter');
var signuprouter = require('./routes/signuprouter');
var replyrouter = require('./routes/replyrouter');
var feedbackrouter = require('./routes/feedbackrouter');
var courserouter = require('./routes/courserouter');

var app = express();
app.listen(3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var mongoose = require('mongoose');

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log("Connected correctly to server");
});

//app.use('/login', loginrouter);
//app.use('/logout', logoutrouter);
//app.use('/signup', signuprouter);
app.use('/feedback', feedbackrouter);
app.use('/reply', replyrouter);
app.use('/course', courserouter);

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
		res.status(err.status || 500)
			.json('error', {
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
