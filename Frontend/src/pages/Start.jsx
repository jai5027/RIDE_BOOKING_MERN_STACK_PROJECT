import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=672/height=672/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy80MmEyOTE0Ny1lMDQzLTQyZjktODU0NC1lY2ZmZmUwNTMyZTkucG5n)] h-screen w-full pt-8 flex justify-between flex-col'>
        <img className='w-16 ml-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt=''/>
         <div className='bg-white pb-7 py-4 px-4'>
            <h2 className='text-3xl font-bold text-center'>Get Started with Uber</h2>
            <Link to='/login' className='flex justify-center items-center w-full bg-black text-white py-3 mt-5 rounded-2xl'>Continue</Link>
         </div>
      </div>
    </div>
  )
}

export default Start
