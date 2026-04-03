import React, { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(() => {
    if(finishRidePanel){
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translate(100%)'
      })
    }
  }, [finishRidePanel])

  return (
  <div className='h-screen'>
     
      <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
        <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt=''/>
      <Link to='/home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-line"></i>
      </Link>
      </div>

      <div className='h-4/5'>
        <img className='h-full w-full object-cover' src='https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png' alt=''/>
      </div>

      <div className='h-1/5 p-6 flex justify-between items-center relative bg-yellow-400'
       onClick={() => setFinishRidePanel(true)}
      >
       <h5 className='w-full text-center absolute top-0 right-1'>
        <i className="text-3xl text-black ri-arrow-up-wide-line"></i>
        </h5>
        <div className='flex flex-col'>
          <h4 className='text-xl font-semibold'>4 KM away</h4>
        </div>
        <button
        className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
      </div>
           
           <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 bg-white'>
           <FinishRide setFinishRidePanel={setFinishRidePanel} ride={rideData}/>
      </div>

    </div>
  )
}

export default CaptainRiding
