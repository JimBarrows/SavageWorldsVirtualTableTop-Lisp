var express = require('express');
var router = express.Router();
var sequelize = require('sequelize');

var db = require("../models");

var Scene = db.Scene;

var Character = db.Character;

console.log("Building scenes routes.");

router.get('/', function(req, res) {
	Scene.findAll({
		order: 'Scene.name ASC'
	}).then(function(data) {
		res.send({
			'scene': data
		});
	})
	.catch( function(error){
		console.log("error: " + error);
		res.status(400).send( {"errors": error}).end();
	});
});

router.post('/', function(req, res) {
	var newRec = req.body.scene;
	Scene.create(newRec)
		.then( function(data) {
			res.status(201).send({ scene: data}).end();	
		})
		.catch( function(error){
			console.log("error: " + error);
			res.status(400).send( {"errors": error}).end();
		});
});

router.get('/:id', function(req, res) {
	Scene.findById( req.params.id).then(function(data){
		res.send({
			'scene':data
		});	
	})
	.catch( function(error){
		console.log("error: " + error);
		res.status(400).send( {error: error}).end();
	});
});

router.put('/:id', function(req, res) {
	Scene.findById( req.params.id)
		.then(function(data){
			data.updateAttributes(req.body.scene)
				.then(function(data) {
					res.send({
						'scene': data
					});
				});
		})
		.catch( function(error){
			console.log("error: " + error);
			res.status(400).send( {"errors": error}).end();
		});
});

router.delete('/:id', function(req, res) {
	Scene.findById( req.params.id).then(function(data) {
		data.destroy().then(function(){
			res.status(204).end();	
		});
	})
	.catch( function(error){
		console.log("error: " + error);
		res.status(400).send( {"errors": error}).end();
	});
});

module.exports = router;