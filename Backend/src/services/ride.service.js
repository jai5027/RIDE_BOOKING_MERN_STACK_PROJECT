const rideModel = require('../models/ride.model.js')
const mapService = require('../services/map.service.js')

// Fare rates for different vehicle types (in currency units)
const FARE_RATES = {
    auto: {
        baseFare: 20,
        distanceRate: 8,      // per km
        timeRate: 0.5         // per minute
    },
    car: {
        baseFare: 30,
        distanceRate: 12,     // per km
        timeRate: 0.8         // per minute
    },
    motorcycle: {
        baseFare: 10,
        distanceRate: 5,      // per km
        timeRate: 0.3         // per minute
    }
}

async function getFare(pickup, destination){
   if(!pickup || !destination){
       throw new Error('Pickup and destination are required')
   }

   const distanceTime = await mapService.getDistanceTime(pickup, destination)
   
   if(!distanceTime){
       throw new Error('Unable to calculate distance and time')
   }

    const distance = parseFloat(distanceTime.distance_in_km); 
    const duration = parseFloat(distanceTime.duration_in_min);

   const fares = {
       auto: calculateFare(distance, duration, 'auto'),
       car: calculateFare(distance, duration, 'car'),
       motorcycle: calculateFare(distance, duration, 'motorcycle')
   }

   return fares
}

function calculateFare(distance, duration, vehicleType){
   if(!FARE_RATES[vehicleType]){
       throw new Error(`Invalid vehicle type: ${vehicleType}`)
   }

   const rates = FARE_RATES[vehicleType]
   const fare = rates.baseFare + (distance * rates.distanceRate) + (duration * rates.timeRate)
   
   return Math.round(fare * 100) / 100  // Round to 2 decimal places
}

function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString()
        return otp
    }
    return generateOtp(num)
}

const createRide = async ({ 
    user, pickup, destination, vehicleType
 }) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required')
    }

    const fare = await getFare(pickup, destination)

    const ride = await rideModel.create({
          user, pickup, destination, otp:getOtp(6), fare: fare[ vehicleType ]
    })

    return ride
}

module.exports = {
    createRide,
    getFare
}