const captainModel = require('../models/captain.model.js')
const captainService = require('../services/captain.service.js')
const { validationResult } = require('express-validator')

async function registerCaptain(req, res, next){

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password, vehicle } = req.body

    const existingCaptain = await captainModel.findOne({email})
    if (existingCaptain) {
        return res.status(400).json({ error: 'Email is already registered' })
    }

    const hashPassword = await captainModel.hashPassword(password)

   const captain = await captainService.createCaptain({
    fullname: {
        firstName: fullname.firstName,
        lastName: fullname.lastName
    },
    email,
    password: hashPassword,
    vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    }
})

    const token = captain.generateAuthToken()
    res.cookie('token', token)
    
    res.status(201).json({ token, captain})
}

module.exports = { registerCaptain } 
