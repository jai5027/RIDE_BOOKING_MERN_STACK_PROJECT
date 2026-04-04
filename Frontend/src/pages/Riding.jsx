import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSocket } from '../context/SocketContext.jsx'
import { useNavigate } from 'react-router-dom'
import LiveMap from '../components/LiveMap.jsx'
import { useEffect, useState } from 'react'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useSocket()
    const navigate = useNavigate()

   // 📍 User location
  const [position, setPosition] = useState([26.9124, 75.7873])

  // 🚗 Captain location
  const [captainLocation, setCaptainLocation] = useState(null)

  useEffect(() => {
    if (!socket || !ride) return

    // ✅ user current location
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([
        pos.coords.latitude,
        pos.coords.longitude
      ])
    })

    // 🔥 join ride room
    socket.emit('join-ride', ride._id)

    // 🚗 receive captain location
    socket.on('receive-location', (data) => {
      setCaptainLocation(data.location)
    })

    // 🛑 ride ended
    socket.on('ride-ended', () => {
      navigate('/home')
    })

    // cleanup
    return () => {
      socket.off('receive-location')
      socket.off('ride-ended')
    }

  }, [socket, ride])


  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

<div className='absolute inset-0 z-0'>
  <LiveMap 
          position={position} 
          captainLocation={captainLocation} 
        />
</div>

<div className='absolute bottom-0 w-full z-10 bg-white p-4 rounded-t-2xl shadow-lg'>

  <div className='h-1/2'>
    
    <div className='flex items-center justify-between'>
      <img 
        className='h-15' 
        src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iYWRmYjFkNi02YzJiLTQ1NTMtYjkyOS05ZmYzMmYwMmE1NWUucG5n' 
        alt='' 
      />  

      <div className='text-right'>
        <h2 className='text-lg font-medium'>
          {ride?.captain?.fullname?.firstName} {ride?.captain?.fullname?.lastName}
        </h2>
        <h4 className='text-xl font-semibold -mt-1 -mb-1'>
          {ride?.captain?.vehicle?.plate}
        </h4>
        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
      </div>
    </div>

    <div className='w-full mt-5'>
      
      <div className='flex items-center gap-5 p-3 border-b'>
        <i className="text-lg ri-map-pin-2-fill"></i>
        <div>
          <h3 className='text-lg font-medium'>Destination</h3>
          <p className='text-sm text-gray-600'>{ride?.destination}</p>
        </div>
      </div>

      <div className='flex items-center gap-5 p-3'>
        <i className="ri-currency-line"></i>
        <div>
          <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
          <p className='text-sm text-gray-600'>Cash</p>
        </div>
      </div>

    </div>

    <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
      Make a Payment
    </button>

  </div>

</div>
 </div>

)
}

export default Riding
