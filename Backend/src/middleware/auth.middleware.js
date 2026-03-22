const userModel = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blacklistTokenModel = require('../models/BalcklistToken.model.js')
const captainModel = require('../models/captain.model.js')

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]
    if(!token){
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isBlacklist = await blacklistTokenModel.findOne({ token })
    if(isBlacklist){
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        const user = await userModel.findById(decoded.id)
        if (!user) {
        return res.status(404).json({ message: "User not found" })
        }

        req.user = user
        return next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]
    if(!token){
        return res.status(401).json({ message: "Unauthorized" })
    }

    const isBlacklist = await blacklistTokenModel.findOne({ token })
    if(isBlacklist){
        return res.status(401).json({ message: "Unauthrized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const captain = await captainModel.findById(decoded.id)
        if(!captain){
            return res.status(404).json({ message: "User not found"})
        }
        req.captain = captain
        return next()
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }
}