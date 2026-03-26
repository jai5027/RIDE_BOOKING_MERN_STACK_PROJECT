import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
      <div>
        <h5 onClick={() => props.setFinishRidePanel(false)} className='p-2 text-center absolute top-2 right-4'>
        <i className="text-2xl text-gray-400 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl mb-3 font-semibold'>Finish this Ride</h3>

        <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-12 rounded-full object-cover w-12' src='https://img.freepik.com/premium-photo/portrait-smiling-driver-driving-his-car-giving-thumbs-up-camera_232070-25141.jpg' />
                <h2 className='text-lg font-medium'>Pawan Sharma</h2>
            </div>
            <h5 className='text-lg font-medium'>2.2 KM</h5>
        </div>

        <div className='flex gap-2 justify-center items-center flex-col'>
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b'>
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kahankariya Talab, Jaipur</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3 border-b'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kahankariya Talab, Jaipur</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹193.20</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>

        </div>
         <div className='flex flex-col w-full mt-10'>
            
        <Link to='/captain-home'
         className='w-full mt-3 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</Link>
         </div>
        </div>   
    </div>
  )
}

export default FinishRide
