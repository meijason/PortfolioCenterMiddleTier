var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Portfolio = require('../models/portfolio');

var portfolioRouter = express.Router();
portfolioRouter.use(bodyParser.json());

portfolioRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    
    Portfolio.find({})
        .populate('postedBy')
        .populate('items')
        .exec(function (err, portfolios) {
        if (err) throw err;
        res.json(portfolios);
    });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    /*Portfolio.findOne( { postedBy: req.decoded._doc._id }, function (err, port) {
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        console.log("user id is: " + req.decoded._doc._id);
        console.log(port);
        if(!port) {
            console.log("Had to create a new portfolio!");
            port = new Portfolio({ postedBy: req.decoded._doc._id, items: [] });
            if( req.body.name) {
                port.name = req.body.name;
            }
            if( req.body.description) {
                port.description = req.body.description;
            }
        }
        port.save(function (err, favorite) {
            if (err) throw err;
			console.log(req.body);
            console.log('Updated Portfolio!');
            res.json(port);
        });
    });*/
	
	var port = new Portfolio({
		name: req.body.name,
		description: req.body.description,
		postedBy: req.decoded._doc._id
	  })
	  port.save(function (err, port) {
		if (err) { return next(err) }
		res.json(port);
	  })
});

portfolioRouter.route('/:id')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Portfolio.findOne({ _id: req.params.id })
        .populate('postedBy')
        .populate('items')
        .exec(function (err, port) {
		console.log('param id: ' + req.params.id);
		console.log('port is: ' + port);
		console.log('user id: ' + req.decoded._doc._id);
        if (err) throw err;
        res.json(port);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Portfolio.find({ _id: req.params.id })
        .remove()
        .exec(function (err, port) {
        if (err) throw err;
        res.json(port);
    });
});

portfolioRouter.route('/:id/:securityId')
.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Portfolio.findOne( { _id: req.params.id }, function (err, port) {
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        console.log("user id is: " + req.decoded._doc._id);
        //console.log(port);
        if(!port) {
            console.log("Portfolio could not be found when trying to add new security.");
            return;
        }
        if(port.items.indexOf(req.params.securityId) == -1) port.items.push(req.params.securityId);
        port.save(function (err, port) {
            if (err) throw err;
            console.log('Updated Portfolio!');
            res.json(port);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Portfolio.findOne( { _id: req.params.id }, function (err, port) {
            if (err) throw err;
            req.body.postedBy = req.decoded._doc._id;
            if(!port) {
                console.log("Portfolio do not exist for this user...");
            } else {
                var index = port.items.indexOf(req.params.securityId);
                if(index > -1) 
                    port.items.splice(index, 1);
                port.save(function (err, result) {
                    if (err) throw err;
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('Deleted portfolio item ' + req.params.securityId);
                });
            }
        });
});

module.exports = portfolioRouter;
