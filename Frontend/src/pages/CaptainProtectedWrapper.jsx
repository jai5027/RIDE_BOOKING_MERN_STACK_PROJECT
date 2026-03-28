import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCaptain } from '../context/CaptainContext.jsx'

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useCaptain()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 🔴 token nahi hai
        if (!token) {
            navigate('/captain-login')
            return
        }
        
        // ✅ API call inside useEffect
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                if (response.status === 200) {
                    setCaptain(response.data.captain)
                }

            } catch (error) {
                console.log(error.response?.data || error.message)

                localStorage.removeItem('token')
                navigate('/captain-login')

            } finally {
                setLoading(false)
            }
        }

        fetchProfile()

    }, [token, navigate, setCaptain])

    // ⏳ loading
    if (loading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default CaptainProtectedWrapper