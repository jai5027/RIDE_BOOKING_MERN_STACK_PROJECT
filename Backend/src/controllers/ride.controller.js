 const rideService = require('../services/ride.service.js')
 const { validationResult } = require('express-validator')
 const mapService = require('../services/map.service.js')
 const captainModel = require('../models/captain.model.js')
 const { sendMessageToSocketId } = require('../socket.js')
const rideModel = require('../models/ride.model.js')

 const createRide = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { userId, pickup, destination, vehicleType } = req.body
     
    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType })

        const pickupCoordinates = await mapService.getCoordinates(pickup)
    
        const captainInRadius = await mapService.getCaptaininTheRedius(
        pickupCoordinates.lon,
        pickupCoordinates.lat, 
        500000)
        
        ride.otp = ""

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user')

        captainInRadius.map(async captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

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

 const confirmRide = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { rideId } = req.body
    try {
        const ride = await rideService.confirmRide({rideId, captain: req.captain._id})
        console.log("FINAL URL:", `${import.meta.env.VITE_BASE_URL}/rides/confirm`)
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
 }

 module.exports = { createRide, getFare, confirmRide }