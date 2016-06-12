var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Security = require('../models/security');

var securityRouter = express.Router();
securityRouter.use(bodyParser.json());

securityRouter.route('/')
.get(function (req, res, next) {
    
    Security.find({})
        //.populate('priceHistories')
        .exec(function (err, securities) {
        if (err) throw err;
        res.json(securities);
    });
    
    /*console.log("find portfolios for user id: " + req.decoded._doc._id)
    Portfolio.find({ postedBy: req.decoded._doc._id })
        .populate('postedBy')
        .populate('items')
        .exec(function (err, portfolios) {
        if (err) throw err;
        res.json(portfolios);
    });*/
});

securityRouter.route('/:securityId')
.get(function (req, res, next) {
    Security.findOne({ _id: req.params.securityId })
        .populate('prices')
        .exec(function (err, sec) {
        if (err) throw err;
        res.json(sec);
    });
});

module.exports = securityRouter;
