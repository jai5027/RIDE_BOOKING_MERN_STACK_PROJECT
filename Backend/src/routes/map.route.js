const express = require("express");
const router = express.Router();
const { authUser } = require('../middleware/auth.middleware.js')
const mapController = require("../controllers/map.controller");
const { query } = require('express-validator')

router.get("/get-coordinates",
    query('address').isString().isLength({ min: 3 }),
    authUser, mapController.getCoordinatesController)

router.get("/get-distance-time",
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    mapController.getDistanceTimeController);    

router.get('/get-suggestions', 
    query('input').isString().isLength({ min: 3 }),
    mapController.getAutoCompletesuggestions)
    
module.exports = router;