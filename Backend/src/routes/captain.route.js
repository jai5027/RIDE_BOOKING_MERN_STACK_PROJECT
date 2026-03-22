const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller.js')

router.post('/register', [
     body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid Email'),
      body('fullname.firstName')
     .notEmpty().withMessage('First name is required')
     .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
      body('password')
    .notEmpty().withMessage('Password is required')
     .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      body('vehicle.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
      body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters long'),
      body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive integer'),
      body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be either car, motorcycle, or auto')
],
captainController.registerCaptain
)

module.exports = router