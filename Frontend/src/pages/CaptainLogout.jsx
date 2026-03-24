import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {
     const navigate = useNavigate()

     useEffect(() => {

        const logout = async () => {
         const token = localStorage.getItem('token')
          
         try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }) 
            
            if(response.status === 200){
                localStorage.removeItem('token')
                navigate('/captain-logout')
            }
         } catch (error) {
            console.log(error.response?.data)
         }
        }
        logout()
     }, [navigate])
  return null
}

export default CaptainLogout
