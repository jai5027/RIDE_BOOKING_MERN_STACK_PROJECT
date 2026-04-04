import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPenal from '../components/LocationSearchPenal.jsx'
import VehiclePanel from '../components/VehiclePanel.jsx'
import ConfirmedRide from '../components/ConfirmedRide.jsx'
import LookingForDriver from '../components/LookingForDriver.jsx'
import WaitingForDriver from '../components/WaitingForDriver.jsx'
import axios from 'axios'
import { useSocket } from '../context/SocketContext.jsx'
import { useUser } from '../context/userContext.jsx'
import { useNavigate } from 'react-router-dom'
import LiveMap from '../components/LiveMap.jsx'
import { useCaptain } from '../context/CaptainContext.jsx'

const Home = () => {
  const [pickup, setPickup] = useState({ pickup: '', drop: '' })
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const ConfirmedRidePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmedRidePanelOpen, setConfirmedRidePanelOpen] = useState(false)
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false)
  const [waitingFroDriverPanelOpen, setWaitingFroDriverPanelOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const { user } = useUser()
  const { socket } = useSocket()


  const navigate = useNavigate()
  const { captain } = useCaptain()
    const [position, setPosition] = useState([26.9124, 75.7873])
  
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

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id  })
  }, [user])

  socket.on('ride-confirmed', (data) => {
    setConfirmedRidePanelOpen(false)
    setLookingForDriverPanelOpen(false)
    setWaitingFroDriverPanelOpen(true)
    setRide(data)
})

socket.on('ride-started', (ride) => {
  setWaitingFroDriverPanelOpen(false)
  navigate('/riding', { state: { ride } })
})
   
  const HandleSubmit = (e) => {
    e.preventDefault()
  }

  const HandleChange = (e) => {
    const { name, value } = e.target
    setPickup({ ...pickup, [name]: value })
  }

  useEffect(() => {
  const delay = setTimeout(async () => {

    if (!activeField) return; 
    const query = pickup[activeField]
    
    if (query.length > 2) {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: query },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        setSuggestions(res.data)
      } catch (err) {
        console.error(err)
      }
    } else {
      setSuggestions([])
    }

  }, 500)

  return () => clearTimeout(delay)
},  [pickup[activeField], activeField])


  useGSAP(() => {
   if(panelOpen){
     gsap.to(panelRef.current, {
      height: '70%',
      padding: 24
    })
    gsap.to(panelCloseRef.current, {
      opacity: 1
    })
   } else {
    gsap.to(panelRef.current, {
      height: '0%',
      padding:0
    })
     gsap.to(panelCloseRef.current, {
      opacity: 0
    })
   }
  }, [panelOpen])

  useGSAP(() => {
    if(vehiclePanelOpen){
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translate(100%)'
      })
    }
  }, [vehiclePanelOpen])

    useGSAP(() => {
    if(confirmedRidePanelOpen){
      gsap.to(ConfirmedRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ConfirmedRidePanelRef.current, {
        transform: 'translate(100%)'
      })
    }
  }, [confirmedRidePanelOpen])

  useGSAP(() => {
    if(lookingForDriverPanelOpen){
      gsap.to(lookingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: 'translate(100%)'
      })
    }
  }, [lookingForDriverPanelOpen])

    useGSAP(() => {
    if(waitingFroDriverPanelOpen){
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translate(100%)'
      })
    }
  }, [waitingFroDriverPanelOpen])

const findTrip = async () => {
  try {
    setVehiclePanelOpen(true)
    setPanelOpen(false)

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup: pickup.pickup,
          destination: pickup.drop
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    setFare(response.data)

  } catch (error) {
    console.log("ERROR:", error.response?.data || error.message)
  }
}

async function createRide(){
  try {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
    pickup: pickup.pickup, 
    destination: pickup.drop,
    vehicleType 
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  } catch (error) {
    console.log(error.response?.data)
  }
}

  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
      
<div className='absolute inset-0 z-0'>
  <LiveMap position={position} /> 
</div>

  <img 
    className='w-16 absolute right-5 top-5 z-10'
    src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
  />

      <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full z-10 '>

<div className='h-[30%] p-6 bg-white relative rounded-t-2xl shadow-lg '>
        <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='opacity-0 text-xl absolute top-4 right-6'>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={HandleSubmit}>
          <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>

          <input 
           onClick={() => {
           setPanelOpen(true)
           setActiveField('pickup')
           }}
           onChange={HandleChange}
           value={pickup.pickup}
           name='pickup'
           className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type='text' placeholder='Add a pick-up location'/>
         
          <input 
          onClick={() => {
          setPanelOpen(true)
          setActiveField('drop')
          }}
          onChange={HandleChange}
          value={pickup.drop}
          name='drop'
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4' type='text' placeholder='Enter your destination'/>
        
        </form>
        <button onClick={findTrip} 
          className='bg-black text-white py-2 px-4 rounded-lg w-full mt-3'>Find Ride</button>
      </div>

      <div ref={panelRef} className='bg-white'>
         <LocationSearchPenal setPickup={setPickup} suggestions={suggestions} setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} activeField={activeField}   />
      </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white'>
      <VehiclePanel selectVehicle={setVehicleType} fare={fare} setPickup={setPickup} setConfirmedRidePanelOpen={setConfirmedRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>

        <div ref={ConfirmedRidePanelRef} className='fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white'>
         <ConfirmedRide vehicleType={vehicleType} fare={fare} pickup={pickup.pickup} destination={pickup.drop} createRide={createRide} setConfirmedRidePanelOpen={setConfirmedRidePanelOpen} setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}/>
      </div>

        <div ref={lookingForDriverRef} className='fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white'>
         <LookingForDriver vehicleType={vehicleType} fare={fare} pickup={pickup.pickup} destination={pickup.drop} setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}/>
      </div>

        <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white'>
         <WaitingForDriver 
          ride={ride}
         setWaitingFroDriverPanelOpen={setWaitingFroDriverPanelOpen} />
      </div>
    </div>
  )
}

export default Home
