import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSocket } from '../context/SocketContext.jsx'
import { useNavigate } from 'react-router-dom'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const socket = useSocket()
    const navigate = useNavigate()

    socket.on('ride-ended', () => {
            navigate('/home')
    })


  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      <div className='h-1/2'>
        <img className='h-full w-full object-cover' src='https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png' alt=''/>
      </div>

      <div>
        <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
        <img className='h-15' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iYWRmYjFkNi02YzJiLTQ1NTMtYjkyOS05ZmYzMmYwMmE1NWUucG5n' alt=''/>  
        <div className='text-right'>
            <h2 className='text-lg font-medium'>{ride.captain?.fullname?.firstName + ' ' + ride.captain?.fullname?.lastName}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride.captain?.vehicle?.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti suzuki alto</p>
        </div>
        </div>
    
        <div className='flex gap-2 justify-center items-center flex-col'>
        <div className='w-full mt-5'>
         
            <div className='flex items-center gap-5 p-3 border-b'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>

        </div>
       </div>
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg' >Make a Payment</button>
        </div>
      </div>
    </div>
  )
}

export default Riding
