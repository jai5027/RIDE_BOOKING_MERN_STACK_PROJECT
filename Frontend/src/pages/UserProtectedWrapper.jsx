import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../context/userContext.jsx'

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setUser } = useUser()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 🔴 token nahi hai
        if (!token) {
            navigate('/login')
            return
        }

        // ✅ API call inside useEffect
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response.status === 200) {
                    setUser(response.data)
                }

            } catch (error) {
                console.log(error.response?.data || error.message)

                localStorage.removeItem('token')
                navigate('/login')

            } finally {
                setLoading(false)
            }
        }

        fetchProfile()

    }, [token, navigate, setUser])

    // ⏳ loading
    if (loading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default UserProtectedWrapper