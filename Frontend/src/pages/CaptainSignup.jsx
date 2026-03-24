import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCaptain } from '../context/CaptainContext.jsx'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const { captain, setCaptain } = useCaptain()

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    color: '',
    plate: '',
    capacity: '',
    vehicleType: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const captainData = {
      fullname: {
        firstName: data.firstname,
        lastName: data.lastname
      },
      email: data.email,
      password: data.password,
      vehicle: {
        color: data.color,
        plate: data.plate,
        capacity: Number(data.capacity),
        vehicleType: data.vehicleType
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      )

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (error) {
      console.log(error.response?.data)
    }

    setData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      color: '',
      plate: '',
      capacity: '',
      vehicleType: ''
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-8' src='https://pngimg.com/d/uber_PNG24.png' alt='' />

        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-semibold mb-2'>Captain Information</h3>

          <div className='flex gap-4 mb-6'>
            <input name='firstname' value={data.firstname} onChange={handleChange}
              className='bg-gray-200 px-4 py-2 w-1/2 rounded-lg' placeholder='Firstname' />

            <input name='lastname' value={data.lastname} onChange={handleChange}
              className='bg-gray-200 px-4 py-2 w-1/2 rounded-lg' placeholder='Lastname' />
          </div>

          <input name='email' value={data.email} onChange={handleChange}
            className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg'
            placeholder='email@example.com' />

          <input name='password' value={data.password} onChange={handleChange}
            className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg'
            placeholder='password' />

          {/* 🚗 Vehicle Fields */}
          <input name='color' value={data.color} onChange={handleChange}
            className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg'
            placeholder='Vehicle Color' />

          <input name='plate' value={data.plate} onChange={handleChange}
            className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg'
            placeholder='Plate Number' />

          <input name='capacity' value={data.capacity} onChange={handleChange}
            className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg'
            placeholder='Capacity' type='number' />

          <select name='vehicleType' value={data.vehicleType} onChange={handleChange}
            className='bg-gray-200 mb-4 px-4 py-2 w-full rounded-lg'>
            <option value=''>Select Vehicle Type</option>
            <option value='car'>Car</option>
            <option value='motorcycle'>Motorcycle</option>
            <option value='auto'>Auto</option>
          </select>

          <button className='bg-black text-white w-full py-2 rounded-lg'>
            Create Account
          </button>
        </form>

        <p className='text-center mt-2'>
          Already have account? <Link to='/captain-login' className='text-blue-400'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup