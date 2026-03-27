import React from 'react'

const LocationSearchPenal = (props) => {

  return (
    <div>
      {props.suggestions.map((address, index) => {
        return <div onClick={() => {
          // props.setVehiclePanelOpen(true)
          //                           props.setPanelOpen(false)
                                  
                 props.setPickup(prev => ({
                 ...prev,
                 [props.activeField]: address.display_name
              }))
       }}     
        key={index} className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl items-center justify-start gap-4 my-2'>
        <h4 className='text-2xl bg-[#eee] rounded-full flex justify-center items-center h-10 w-10 '><i className="ri-map-pin-2-line"></i></h4>
        <h4 className='font-medium'>{address.display_name}</h4>
      </div>
      })}
    </div>
  )
}

export default LocationSearchPenal
