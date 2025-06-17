import './App.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon, Circle, CircleMarker} from 'react-leaflet'
import React, { useState, useEffect, useCallback, useMemo} from 'react'

const center = [38.6263, -90.1751]
const zoom = 10

const polyline = [
  [38.6217, -90.05],
  [38.626, -90.17],
  [38.626, -90.27],
]

const multiPolyline = [
  [
    [38.75, -90.1],
    [38.755, -90.12],
    [38.755, -90.12],
  ],
  [
    [38.55, -90.05],
    [38.55, -90.06],
    [38.52, -90.06],
  ],
]

const polygon = [
  [38.515, -90.19],
  [38.22, -90.23],
  [38.22, -90.27],
]

const purpleOptions = { color: 'purple' }
const limeOptions = { color: 'lime' }
const fillBlueOptions = { fillColor: 'blue' }
const redOptions = { color: 'red' }

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
         <Polyline pathOptions={limeOptions} positions={polyline} />
         <Polyline pathOptions={limeOptions} positions={multiPolyline} />
         <Polygon pathOptions={purpleOptions} positions={polygon} />
         <Circle center={center} pathOptions={fillBlueOptions} radius={5000} />
         <CircleMarker center={[38.653, -90.92]} pathOptions={redOptions} radius={20}>
             <Popup>Popup in CircleMarker</Popup>
         </CircleMarker>
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