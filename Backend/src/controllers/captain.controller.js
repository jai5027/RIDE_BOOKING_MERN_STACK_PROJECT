const captainModel = require('../models/captain.model.js')
const captainService = require('../services/captain.service.js')
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/BalcklistToken.model.js')

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

async function loginCaptain(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const captain = await captainModel.findOne({ email }).select('+password')
    if(!captain){
        return res.status(401).json({ message: "Invalid Email or Password" })
    }

    const isMatch = await captain.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({ message: "Invalid Email or Password" })
    }

    const token = await captain.generateAuthToken()
    res.cookie('token', token)

    res.status(200).json({ token, captain })
}

async function getCaptainProfile(req, res, next){
    res.status(200).json({ captain: req.captain })
}

async function logoutCaptain(req, res, next){
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1]
    res.clearCookie('token')

    await blacklistTokenModel.create({ token })

    res.status(200).json({ message: "logout successfully" })
}

module.exports = { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } 
