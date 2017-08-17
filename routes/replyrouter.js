var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Replies = require('../models/replies');

var replyrouter = express.Router();

replyrouter.use(bodyParser.json());

replyrouter.route('/')
	.get(function(req, res, next) {
		Replies.find({}, function(err, replies) {
			if (err) console.log(err);;
			res.json(replies);
		});
	})
	.post(function(req, res, next) {
		var reply = req.body;
		Replies.create(reply, function(err, reply) {
			if (err) {
				console.log(err);
			}
			console.log('Reply created!!');
			res.status(200);
			res.json(reply);
		});
	});

replyrouter.route('/:replyId')
	.get(function(req, res, next) {
		Replies.findById(req.params.replyId, function(err,
			reply) {
			if (err) {
				console.log(err);
			}
			res.json(reply);
		});
	})
	.put(function(req, res, next) {
		Replies.findByIdAndUpdate(req.params.replyId, {
			$set: req.body
		}, {
			new: true
		}, function(err, reply) {
			if (err) console.log(err);;
			res.json(reply);
		});
	})
	.delete(function(req, res, next) {
		Replies.findByIdAndRemove(req.params.replyId, function(err, resp) {
			if (err) console.log(err);
			res.json(resp);
		});
	});

module.exports = replyrouter;
