var express = require('express');
var router = express.Router();
var models = require('../models');
var Place = models.Place;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
module.exports = router;

router.get('/', function(req,res,next){
    var outerScopeContainer = {};
    Hotel.findAll()
    .then(function (dbHotels) {
        outerScopeContainer.dbHotels = dbHotels;
        return Restaurant.findAll();
    })
    .then(function (dbRestaurants) {
        outerScopeContainer.dbRestaurants = dbRestaurants;
        return Activity.findAll();
    })
    .then(function (dbActivities) {
        res.render('index', {
            templateHotels: outerScopeContainer.dbHotels,
            templateRestaurants: outerScopeContainer.dbRestaurants,
            templateActivities: dbActivities
        });
    })
    .catch(next);
})

//    res.render('index');
