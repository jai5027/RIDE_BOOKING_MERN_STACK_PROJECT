 const rideService = require('../services/ride.service.js')
 const { validationResult } = require('express-validator')
 const mapService = require('../services/map.service.js')

 const createRide = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { userId, pickup, destination, vehicleType } = req.body
     
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType })
        console.log(ride)
        const pickupCoordinates = await mapService.getCoordinates(pickup)
        console.log(pickupCoordinates)
        const captainInRadius = await mapService.getCaptaininTheRedius(
        pickupCoordinates.lat,
        pickupCoordinates.lon, 
        200)
        console.log(captainInRadius)
        res.status(201).json(ride)
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
 }

 const getFare = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { pickup, destination } = req.query

    try {
        const fare = await rideService.getFare(pickup, destination)
        return res.status(200).json(fare)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
 }

 module.exports = { createRide, getFare }