var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var mailer = require('../services/mailer');
var Feedbacks = require('../models/feedbacks');
var Students = require('../models/students');

var feedbackrouter = express.Router();
feedbackrouter.use(bodyParser.json());

feedbackrouter.route('/')
	.get(Verify.verifyUser, function(req, res, next) {
		Feedbacks.find({student_id: req.body.student_id}, function(err, feedbacks) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(feedbacks);
		});
	})
	.post(Verify.verifyUser, function(req, res, next) {
		var feedback = req.body;
		Feedbacks.create(feedback, function(err, feedback) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			console.log('Feedback created!!');
			Students.findById(req.body.student_id, function(err, student) {
				if (err) {
					console.log(err);
					return res.status(500).json({err: err});
				}
				mailer.feedbackConfirmation(student.email_id);
			})
			res.status(200).json(feedback);
		});
	});

feedbackrouter.route('/:Id/replies')
	.post(Verify.verifyUser, function(req, res, next) {
		Feedbacks.findById(req.params.Id, function(err, feedback) {
			if (err){
				console.log(err);
				return res.status(500).json({err: err});
			}
			feedback.replies.push(req.body);
			feedback.save(function(err, feedback) {
				if (err) {
					console.log(err);
					return res.status(500).json({err: err});
				}
				console.log('Updated Replies!');
				mailer.replyRecieved(feedback.student_id);
				res.status(200).json(feedback);
			});
		});
	})

module.exports = feedbackrouter;
