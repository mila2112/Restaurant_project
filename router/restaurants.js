const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const secret = process.env.JWT_SECRET; 
const RestaurantController = require('../controllers/restaurants'); 
const {authorization, authorizationClient, authorizationOwner} = require('../middlewear/authorization');
const restaurants = new RestaurantController(); 
const restaurantsRouter = express.Router(); 

restaurantsRouter.post("/add",[authorization,authorizationOwner], restaurants.register);
restaurantsRouter.post("/tables",[authorization,authorizationOwner], restaurants.addTables);
restaurantsRouter.post("/reserve",[authorization,authorizationClient], restaurants.reserve);
restaurantsRouter.post("/freeTables", restaurants.freeTables);

module.exports = restaurantsRouter;