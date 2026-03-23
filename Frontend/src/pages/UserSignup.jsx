import React from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  return (
 <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-16 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt=''/>
      <form >
        <h3 className='text-base font-medium mb-2'>What's your name</h3>

        <div className='flex gap-4 mb-6'>
       <input 
        required 
        className='bg-gray-200 rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-base'
        type='text' 
        placeholder='Firstname'/>  

       <input 
        required 
        className='bg-gray-200 rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-base'
        type='text' 
        placeholder='Lastname'/>  
        </div> 
      
        <h3 className='text-base font-medium mb-2'>What's your email</h3>

        <input 
        name='email'
        required 
        className='bg-gray-200 mb-6 rounded-lg px-4 py-2 w-full text-lg placeholder:text-sm'
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-base font-medium mb-2' >Enter Password</h3>
        
        <input 
      
        name='password'
        required 
        className='bg-gray-200 mb-6 rounded-lg px-4 py-2 w-full text-lg placeholder:text-sm'
        type='password' 
        placeholder='password'/>

      <button 
        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-sm'
       >Login</button>
      
      </form>
       <p className='text-center' >Already have a account?<Link to='/login' className='text-blue-600 '>Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated
          means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
