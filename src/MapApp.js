import './App.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import React, { useState, useEffect, useCallback, useMemo} from 'react'

const center = [38.6817, -90.0530]
const zoom = 10

function DisplayPosition({map}) {
    const [position, setPosition] = useState(() => map.getCenter())

    const onClick = useCallback(() => {
        map.setView(center, zoom)
    }, [map])

 const onMove = useCallback(() => {
        setPosition(map.getCenter())
    }, [map])

    useEffect(() => {
        map.on('move', onMove)
        return () => {
            map.off('move', onMove)
        }
    }, [map, onMove])

    return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}
function MapCoords(){ 
    const [map, setMap] = useState(null)

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [],
  )

  return (
    <div className = "MapContainerWrapper">
      {map ? <DisplayPosition map={map} /> : null} 
      {displayMap}
    </div>
  )
}
function MapApp() {
  return (
     <div className="MapContainerWrapper">
       <MapContainer center={[center]} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  );
}

export default MapCoords;