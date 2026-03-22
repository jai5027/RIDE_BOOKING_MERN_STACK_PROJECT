const userModel = require('../models/user.model.js')
const { createUser } = require('../services/user.service.js')
const { validationResult } = require('express-validator')
const blacklistTokenModel = require('../models/BalcklistToken.model.js')

async function registerUser(req, res, next){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) 
    }
    const { fullname, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })
    if(isUserAlreadyExists){
       return res.status(400).json({ message: "user already exists" })
    }

    const hashedPassword = await userModel.hashPassword(password)

    const user = await createUser({
        firstname: fullname.firstName,
        lastname: fullname.lastName,
        email,
        password: hashedPassword
    })

    const token = user.generateAuthToken()
    res.cookie('token', token)

    res.status(201).json({ token, user })
}

async function loginUser(req, res, next){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const user = await userModel.findOne({ email }).select('+password')

    if(!user){
        return res.status(401).json({ message: "Invalid Email or Password" })
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({ message: "Invalid Email or Password" })
    }

    const token = user.generateAuthToken()
    res.cookie('token', token)

    res.status(200).json({ token, user })
}

async function getUserProfile(req, res, next){
    res.status(200).json(req.user)
}

async function logoutUser(req, res, next){
    res.clearCookie('token')

    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ]
    await blacklistTokenModel.create({ token })
    
    res.status(200).json({ message: "Logged out" })
}

module.exports = { registerUser, loginUser, getUserProfile, logoutUser }