import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  
  const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      fullName: {
        firstname: data.firstname,
        lastname: data.lastname
      },
      email: data.email,
      password: data.password
    }
    setData({ firstname: '', lastname: '', email: '', password: '' })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  return (
 <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-16 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt=''/>
      <form onSubmit={handleSubmit}>
        <h3 className='text-base font-medium mb-2'>What's your name</h3>

        <div className='flex gap-4 mb-6'>
       <input 
        name='firstname'
        onChange={handleChange}
        value={data.firstname}
        required 
        className='bg-gray-200 rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-sm'
        type='text' 
        placeholder='Firstname'/>  

       <input 
        name='lastname'
        onChange={handleChange}
        value={data.lastname}
        required 
        className='bg-gray-200 rounded-lg px-4 py-2 w-1/2 text-lg placeholder:text-sm'
        type='text' 
        placeholder='Lastname'/>  
        </div> 
      
        <h3 className='text-base font-medium mb-2'>What's your email</h3>

        <input 
        onChange={handleChange}
        value={data.email}
        name='email'
        required 
        className='bg-gray-200 mb-6 rounded-lg px-4 py-2 w-full text-lg placeholder:text-sm'
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-base font-medium mb-2' >Enter Password</h3>
        
        <input 
        onChange={handleChange}
        value={data.password}
        name='password'
        required 
        className='bg-gray-200 mb-6 rounded-lg px-4 py-2 w-full text-lg placeholder:text-sm'
        type='password' 
        placeholder='password'/>

      <button 
        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-sm'
       >Create account</button>
      
      </form>
       <p className='text-center' >Already have a account?<Link to='/login' className='text-blue-600 '>Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the Google <a className='text-blue-600'>Privacy Policy</a> and <a className='text-blue-600'>Terms of Service</a> apply.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
