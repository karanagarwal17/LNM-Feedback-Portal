var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mailer = require('../services/mailer');

var Feedbacks = require('../models/feedbacks');
var Students = require('../models/students');

var feedbackrouter = express.Router();

feedbackrouter.use(bodyParser.json());

feedbackrouter.route('/')
	.get(function(req, res, next) {
		Feedbacks.find({}, function(err, feedbacks) {
			if (err) console.log(err);;
			res.json(feedbacks);
		});
	})
	.post(function(req, res, next) {
		var feedback = req.body;
		Feedbacks.create(feedback, function(err, feedback) {
			if (err) {
				console.log(err);
			}
			console.log('Feedback created!!');
			Students.findById(req.body.student_id, function(err, student){
				if (err) {
					console.log(err);
				}
				mailer.feedbackConfirmation(student.email_id);
			})
			res.status(200);
			res.json(feedback);
		});
	});

feedbackrouter.route('/:Id')
	.get(function(req, res, next) {
		Feedbacks.findById(req.params.Id, function(err,
			feedback) {
			if (err) {
				console.log(err);
			}
			res.json(feedback);
		});
	})
	.put(function(req, res, next) {
		Feedbacks.findByIdAndUpdate(req.params.Id, {
			$set: req.body
		}, {
			new: true
		}, function(err, feedback) {
			if (err) console.log(err);;
			res.json(feedback);
		});
	})
	.delete(function(req, res, next) {
		Feedbacks.findByIdAndRemove(req.params.Id, function(err, resp) {
			if (err) console.log(err);;
			res.json(resp);
		});
	});

module.exports = feedbackrouter;
