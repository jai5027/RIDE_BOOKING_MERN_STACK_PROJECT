const rideModel = require('../models/ride.model.js')
const mapService = require('../services/map.service.js')
const crypto = require('crypto')
const { sendMessageToSocketId } = require('../socket.js')

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

function getOtp(num) {
  function generateOtp(num) {
    const min = Math.pow(10, num - 1)
    const max = Math.pow(10, num) - 1

    const randomNumber = crypto.randomBytes(6).readUIntBE(0, 6)
    const otp = min + (randomNumber % (max - min + 1))

    return otp.toString()
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
          user, pickup, destination, vehicleType, otp:getOtp(6), fare: fare[ vehicleType ]
    })

    return ride
}

const confirmRide = async ({rideId, captainId}) => {
    if(!rideId || !captainId){
        throw new Error('Ride ID and Captain ID are required')
    }
    
    await rideModel.findOneAndUpdate({ _id: rideId }, 
        { captain: captainId, status: 'accepted' })

        const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp')
        
        if(!ride){
            throw new Error('Ride not found')
        }
        return ride
}

const startRide = async ({ rideId, otp, captain }) => {
    if(!rideId || !otp || !captain){
        throw new Error('Ride ID, OTP, and Captain ID are required')
    }

    const ride = await rideModel.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp')

    if(!ride){
        throw new Error('Invalid ride ID or OTP')
    }
    
    if(ride.status !== 'accepted'){
        throw new Error('Ride is not in accepted status')
    }

    if(ride.otp !== otp){
        throw new Error('Invalid OTP')
    }

    await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })
    return ride
}

module.exports = {
    createRide,
    getFare,
    confirmRide,
    startRide
}           
    