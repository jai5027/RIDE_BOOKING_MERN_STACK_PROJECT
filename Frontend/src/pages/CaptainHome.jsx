import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopup from '../components/RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirRidePopup from '../components/ConfirRidePopup'
import { useEffect } from 'react'
import { useSocket } from '../context/SocketContext.jsx'
import { useCaptain } from '../context/CaptainContext.jsx'
import axios from 'axios'
import LiveMap from '../components/LiveMap.jsx'

const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const [position, setPosition] = useState([26.9124, 75.7873])

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useSocket()
  const { captain } = useCaptain()

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }
         const locationInterval = setInterval(updateLocation, 10000)
         updateLocation()
       
        //  return () => clearInterval(locationInterval)

  },[])

useEffect(() => {
  if (!socket || !captain) return

  const updateLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {

      const lat = pos.coords.latitude
      const lng = pos.coords.longitude

      setPosition([lat, lng])

      socket.emit('send-location', {
        captainId: captain._id,
        rideId: ride?._id,
        location: { lat, lng }
      })

    })
  }

  const interval = setInterval(updateLocation, 3000)

  updateLocation()

  return () => clearInterval(interval)

}, [socket, captain, ride])

  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopupPanel(true)
  })

  async function confirmRide(){
      await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
      
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  useGSAP(() => {
    if(ridePopupPanel){
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translate(100%)'
      })
    }
  }, [ridePopupPanel])

  useGSAP(() => {
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translate(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  return (
     <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt=''/>
      <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-line"></i>
      </Link>
      </div>
<div className='absolute inset-0 z-0'>
  <LiveMap position={position} /> 
</div>

  <img 
    className='w-16 absolute right-5 top-5 z-10'
    src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
  />

      <div className='h-2/5 p-6 flex flex-col justify-end bg-white absolute bottom-0 w-full z-10'>
        
         <CaptainDetails />

         <div ref={ridePopupPanelRef} className='fixed bottom-0 left-0 w-full z-10 translate-y-full px-3 py-10 bg-white'>
           <RidePopup confirmRide={confirmRide} ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>

        <div ref={confirmRidePopupPanelRef} className='fixed w-full left-0 h-screen z-10 bottom-0 translate-y-full px-3 py-10 bg-white'>
           <ConfirRidePopup 
            ride={ride}
           setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
      </div>

      </div>
    </div>
  )
}

export default CaptainHome
