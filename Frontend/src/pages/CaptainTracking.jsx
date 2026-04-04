import { useEffect } from 'react'
import { useSocket } from '../context/SocketContext'

const CaptainTracking = ({ rideId }) => {
    const { socket } = useSocket()

    useEffect(() => {
        if (!socket) return

        navigator.geolocation.watchPosition((pos) => {
            const { latitude, longitude } = pos.coords

            socket.emit('captain-location', {
                rideId,
                lat: latitude,
                lng: longitude
            })
        })
    }, [socket])

    return <div>Tracking Started...</div>
}

export default CaptainTracking