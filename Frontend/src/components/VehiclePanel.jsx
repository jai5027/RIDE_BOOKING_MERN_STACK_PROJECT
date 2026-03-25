import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={() => props.setVehiclePanelOpen(false)} className='p-2 text-center absolute top-2 right-4'>
        <i className="text-2xl text-gray-400 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

          <div onClick={() => props.setConfirmedRidePanelOpen(true)} className='p-3 mb-2 flex border-2 border-gray-300 active:border-black rounded-xl w-full justify-center items-center'>
            <img className='h-15' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iYWRmYjFkNi02YzJiLTQ1NTMtYjkyOS05ZmYzMmYwMmE1NWUucG5n' alt=''/>
           
           <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
           </div>

           <h2 className='text-lg font-semibold'>₹193.20</h2>
       <div>
        
       </div>
        </div>

         <div onClick={() => props.setConfirmedRidePanelOpen(true)} className='p-3 mb-2 flex border-2 border-gray-300 active:border-black rounded-xl w-full justify-center items-center'>
            <img className='h-15' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n' alt=''/>
           
           <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-fill"></i>1</span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
           </div>

           <h2 className='text-lg font-semibold'>₹65.17</h2>
       <div>
        
       </div>
        </div>

          <div onClick={() => props.setConfirmedRidePanelOpen(true)} className='p-3 mb-2 flex border-2 border-gray-300 active:border-black rounded-xl w-full justify-center items-center'>
            <img className='h-15' src='https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png' alt=''/>
           
           <div className='ml-2 w-1/2'>
            <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
           </div>

           <h2 className='text-lg font-semibold'>₹65.17</h2>
       <div>
        
       </div>
        </div>
    </div>
  )
}

export default VehiclePanel
