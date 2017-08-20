var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Faculties = require('../models/faculties');

var facultyrouter = express.Router();

facultyrouter.use(bodyParser.json());

facultyrouter.route('/')
	.get(function(req, res, next) {
		Faculties.find({}, function(err, faculties) {
			if (err) console.log(err);;
			res.json(faculties);
		});
	})
	.post(function(req, res, next) {
		var faculty = req.body;
		Faculties.create(faculty, function(err, faculty) {
			if (err) {
				console.log(err);
			}
			console.log('Faculty created!!');
			res.status(200);
			res.json(faculty);
		});
	});

facultyrouter.route('/:year')
	.get(function(req, res, next) {
		Faculties.find({ 'year' : req.params.year}, function(err, faculty) {
			if (err) {
				console.log(err);
			}
			res.json(faculty);
		});
	});


module.exports = facultyrouter;
