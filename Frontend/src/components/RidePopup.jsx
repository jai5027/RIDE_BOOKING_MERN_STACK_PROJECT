import React from 'react'

const RidePopup = (props) => {
  return (
    <div>
             <h5 onClick={() => props.setRidePopupPanel(false)} className='p-2 text-center absolute top-2 right-4'>
        <i className="text-2xl text-gray-400 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl mb-3 font-semibold'>New Available Ride!</h3>

        <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3'>
                <img className='h-12 rounded-full object-cover w-12' src='https://img.freepik.com/premium-photo/portrait-smiling-driver-driving-his-car-giving-thumbs-up-camera_232070-25141.jpg' />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstName + " " + props.ride?.user.fullname.lastName}</h2>
            </div>
            <h5 className='text-lg font-medium'>2.2 KM</h5>
        </div>

        <div className='flex gap-2 justify-center items-center flex-col'>
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b'>
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3 border-b'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>

        </div>
        <button onClick={() => props.setConfirmRidePopupPanel(true)}
        className='w-full mt-3 bg-green-600 text-white font-semibold p-3 rounded-lg'>Accept</button>
       <button onClick={() => props.setRidePopupPanel(false)}
        className='w-full mt-2 bg-gray-300 text-gray-800 font-semibold p-3 rounded-lg'>Ignore</button>
      
        </div>   
    </div>
  )
}

export default RidePopup
