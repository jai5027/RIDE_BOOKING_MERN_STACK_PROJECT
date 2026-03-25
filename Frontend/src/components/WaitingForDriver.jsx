import React from 'react'

const WaitingForDriver = (props) => {
  return (
          <div >
       <h5 onClick={() => props.setWaitingFroDriverPanelOpen(false)} className='p-2 text-center absolute top-2 right-4'>
        <i className="text-2xl text-gray-400 ri-arrow-down-wide-line"></i>
        </h5>

        <div className='flex items-center justify-between'>
        <img className='h-15' src='https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9iYWRmYjFkNi02YzJiLTQ1NTMtYjkyOS05ZmYzMmYwMmE1NWUucG5n' alt=''/>  
        <div className='text-right'>
            <h2 className='text-lg font-medium'>Aayan</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>RJ20 BY 8907</h4>
            <p className='text-sm text-gray-600'>Maruti suzuki alto</p>
        </div>
        </div>

        <div className='flex gap-2 justify-center items-center flex-col'>
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b'>
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kahankariya Talab, Jaipur</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3 border-b'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kahankariya Talab, Jaipur</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3'>
                <i className="ri-currency-line"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹193.20</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>

        </div>
       </div>
    </div>
  )
}

export default WaitingForDriver
