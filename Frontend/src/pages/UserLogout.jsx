import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem('token')

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    
                if (response.status === 200) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            } catch (error) {
                console.log(error.response?.data)
            }
        }

        logout()
    }, [navigate])

    return null
}

export default UserLogout