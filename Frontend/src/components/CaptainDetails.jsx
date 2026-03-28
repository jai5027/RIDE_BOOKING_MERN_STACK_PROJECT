import React from 'react'
import { useCaptain } from '../context/CaptainContext.jsx'

const CaptainDetails = () => {

  const { captain } = useCaptain()
  
  return (
    <div>
       <div className='flex justify-between items-center'>
            <div className='flex justify-center items-center gap-3'>
              <img className='w-10 h-10 rounded-full object-cover' src='https://img.freepik.com/premium-photo/portrait-smiling-driver-driving-his-car-giving-thumbs-up-camera_232070-25141.jpg' alt=''/>
              <h4 className='text-lg font-medium capitalize'>{captain?.fullname?.firstName + " " + captain?.fullname?.lastName}</h4>
            </div>

            <div>
              <h4 className='text-xl font-semibold'>295.20</h4>
              <p className='text-sm font-medium text-gray-600'>Earned</p>
            </div>
           </div>

           <div className='flex p-3 mt-8 bg-gray-200 rounded-xl justify-center gap-5 items-start'>
            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-timer-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>

            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>

            <div className='text-center'>
              <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
              <h5 className='text-lg font-medium'>10.2</h5>
              <p className='text-sm text-gray-600'>Hours Online</p>
            </div>

           </div>
    </div>
  )
}

export default CaptainDetails
