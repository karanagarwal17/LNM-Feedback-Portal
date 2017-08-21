var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');

var Faculties = require('../models/faculties');

var facultyrouter = express.Router();

facultyrouter.use(bodyParser.json());

facultyrouter.route('/')
	.get(Verify.verifyUser, function(req, res, next) {
		Faculties.find({}, function(err, faculties) {
			if (err){
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(faculties);
		});
	})
	.post(Verify.verifyUser, function(req, res, next) {
		var faculty = req.body;
		Faculties.create(faculty, function(err, faculty) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			console.log('Faculty created!!');
			res.status(200).json(faculty);
		});
	});

facultyrouter.route('/:year')
	.get(Verify.verifyUser, function(req, res, next) {
		Faculties.find({ 'year' : req.params.year}, function(err, faculty) {
			if (err) {
				console.log(err);
				return res.status(500).json({err: err});
			}
			res.status(200).json(faculty);
		});
	});


module.exports = facultyrouter;
