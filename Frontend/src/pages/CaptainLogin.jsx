import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCaptain } from '../context/CaptainContext.jsx'

const CaptainLogin = () => {

  const [data, setData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { captain, setCaptain } = useCaptain()
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      const captainData = {
        email: data.email,
        password: data.password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

      if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
      setData({ email: '', password: '' })
    }
  
    const OnHandleChange = (e) => {
      const { name, value } = e.target
      setData({ ...data, [name]: value })
    }

  return (
       <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-16 mb-8' src='https://pngimg.com/d/uber_PNG24.png' alt=''/>
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
       <p className='text-center' >Join a fleet?<Link to='/captain-signup' className='text-blue-600 '>Register as a Captain</Link></p>
      </div>

      <div>
        <Link to='/login'
        className='bg-[#d5622d] flex justify-center items-center text-white font-semibold mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
