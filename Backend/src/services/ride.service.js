const rideModel = require('../models/ride.model.js')
const mapService = require('../controllers/map.controller.js')

const createRide = async ({ }) => {

}

async function getFare(pickup, destination){
   if(!pickup || !destination){
       throw new Error('Pickup and destination are required')
   }

   const distanceTime = await mapService.getDistanceTime(pickup, destination)  
}