import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPenal from '../components/LocationSearchPenal.jsx'
import VehiclePanel from '../components/VehiclePanel.jsx'
import ConfirmedRide from '../components/ConfirmedRide.jsx'
import LookingForDriver from '../components/LookingForDriver.jsx'

const Home = () => {
  const [pickup, setPickup] = useState({ pickup: '', drop: '' })
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const ConfirmedRidePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const lookingForDriverRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmedRidePanelOpen, setConfirmedRidePanelOpen] = useState(false)
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false)

  const HandleSubmit = (e) => {
    e.preventDefault()
  }

  const HandleChange = (e) => {
    const { name, value } = e.target
    setPickup({ ...pickup, [name]: value })
  }

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

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
      
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src='https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png' alt=''/>
      </div>

      <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full'>

      <div className='h-[30%] p-6 bg-white relative'>
        <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='opacity-0 text-xl absolute top-4 right-6'>
          <i className="ri-arrow-down-wide-line"></i>
        </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={HandleSubmit}>
          <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full'></div>

          <input 
           onClick={() => setPanelOpen(true)}
           onChange={HandleChange}
           value={pickup.pickup}
           name='pickup'
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type='text' placeholder='Add a pick-up location'/>
         
          <input 
          onClick={() => setPanelOpen(true)}
          onChange={HandleChange}
          value={pickup.drop}
          name='drop'
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4' type='text' placeholder='Enter your destination'/>
        
        </form>
      </div>

      <div ref={panelRef} className='bg-white'>
         <LocationSearchPenal setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white'>
      <VehiclePanel setConfirmedRidePanelOpen={setConfirmedRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>

        <div ref={ConfirmedRidePanelRef} className='fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white'>
         <ConfirmedRide setConfirmedRidePanelOpen={setConfirmedRidePanelOpen} setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}/>
      </div>

        <div ref={lookingForDriverRef} className='fixed w-full z-10 bottom-0 px-3 py-10 translate-y-full bg-white'>
         <LookingForDriver setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}/>
      </div>
    </div>
  )
}

export default Home
