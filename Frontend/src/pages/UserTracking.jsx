import { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext'
import LiveMap from '../components/LiveMap'

const UserTracking = ({ rideId }) => {
    const { socket } = useSocket()
    const [position, setPosition] = useState([26.9124, 75.7873])

    useEffect(() => {
        if (!socket) return

        socket.emit('join-ride', rideId)

        socket.on('update-location', (data) => {
            setPosition([data.lat, data.lng])
        })

        return () => socket.off('update-location')
    }, [socket])

    return <LiveMap position={position} />
}

export default UserTracking