var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Courses = require('../models/courses');

var courserouter = express.Router();

courserouter.use(bodyParser.json());

courserouter.route('/')
	.get(function(req, res, next) {
		Courses.find({}, function(err, courses) {
			if (err){
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(courses);
		});
	})
	.post(function(req, res, next) {
		var course = req.body;
		Courses.create(course, function(err, course) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			console.log('Course created!!');
			res.status(200).json(course);
		});
	});

courserouter.route('/:courseId')
	.get(function(req, res, next) {
		Courses.findById(req.params.courseId, function(err, course) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(course);
		});
	})
	.put(function(req, res, next) {
		Courses.findByIdAndUpdate(req.params.courseId, {
			$set: req.body
		}, {
			new: true
		}, function(err, course) {
			if (err){
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(course);
		});
	})
	.delete(function(req, res, next) {
		Courses.findByIdAndRemove(req.params.courseId, function(err, resp) {
			if (err){
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(resp);
		});
	});

module.exports = courserouter;
