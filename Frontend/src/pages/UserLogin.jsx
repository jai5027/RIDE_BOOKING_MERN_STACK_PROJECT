import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [data, setData] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setData({ email: '', password: '' })
  }

  const OnHandleChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-16 mb-8' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt=''/>
      <form onSubmit={handleSubmit}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>

        <input 
        onChange={OnHandleChange}
        value={data.email}
        name='email'
        required 
        className='bg-gray-200 mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-lg font-medium mb-2' >Enter Password</h3>
        
        <input 
        onChange={OnHandleChange}
        value={data.password}
        name='password'
        required 
        className='bg-gray-200 mb-7 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        type='password' 
        placeholder='password'/>

      <button 
        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
       >Login</button>
      
      </form>
       <p className='text-center' >New here?<Link to='/signup' className='text-blue-600 '>Create new Account</Link></p>
      </div>

      <div>
        <Link to='/captain-login'
        className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
