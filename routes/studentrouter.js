var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Students = require('../models/students');

var studentrouter = express.Router();

studentrouter.use(bodyParser.json());

studentrouter.route('/')
	.get(function(req, res, next) {
		Students.find({}, function(err, students) {
			if (err) console.log(err);;
			res.json(students);
		});
	})
	.post(function(req, res, next) {
		var student = req.body;
		Students.create(student, function(err, student) {
			if (err) {
				console.log(err);
			}
			console.log('Student created!!');
			res.status(200);
			res.json(student);
		});
	});

module.exports = studentrouter;
