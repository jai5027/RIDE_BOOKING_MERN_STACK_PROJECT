import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// 🔥 Map auto move component
const ChangeView = ({ center }) => {
  const map = useMap()

  useEffect(() => {
    map.setView(center, 15)
  }, [center])

  return null
}

const LiveMap = ({ position, captainLocation }) => {
  return (
    <MapContainer
      center={position}
      zoom={15}
      className='h-full w-full z-0'
      scrollWheelZoom={true}
    >
      
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔥 map ko move karne ke liye */}
      <ChangeView center={position} />

      {/* 👤 USER */}
      <Marker position={position} />

      {/* 🚗 CAPTAIN */}
      {captainLocation && (
        <Marker position={[captainLocation.lat, captainLocation.lng]} />
      )}

    </MapContainer>
  )
}

export default LiveMap