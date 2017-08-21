var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Students = require('../models/students');

var studentrouter = express.Router();

studentrouter.use(bodyParser.json());

studentrouter.route('/')
	.get(Verify.verifyUser, function(req, res, next) {
		Students.find({}, function(err, students) {
			if (err){
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(students);
		});
	})
	.post(Verify.verifyUser, function(req, res, next) {
		var student = req.body;
		Students.create(student, function(err, student) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			console.log('Student created!!');
			res.status(200).json(student);
		});
	});

module.exports = studentrouter;
