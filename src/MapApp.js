import './App.css'
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, useMap, useMapEvents, Tooltip} from 'react-leaflet'
import {Polyline, Polygon, Circle, CircleMarker, Rectangle} from 'react-leaflet'
import React, { useState, useEffect, useCallback, useMemo, useRef} from 'react'

const center = [38.6263, -90.1751]
const zoom = 10
const BOUNDS_STYLE = {weight:1}
const polyline = [
  [38.8113, -89.9557],
  [38.6312, -90.193313],
  [38.6312, -90.193313],
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
const redOptions = { color: 'red' }
const blueOptions = {color : 'blue'}

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

function Minimapbounds({ parentMap, zoom }) {
    const minimap = useMap()
    const onClick = useCallback(
        (e) => {
            parentMap.setView(e.latlng, parentMap.getZoom())
        },
        [parentMap],
    )
    useMapEvents('click', onClick)

    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
        setBounds(parentMap.getBounds())
        minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])

    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    useEffect({ isntance: parentMap}, handlers)

    return <Rectangle bounds = {bounds} pathOptions={BOUNDS_STYLE} />
}

function MinimapControl({ position, zoom }) {
    const parentMap = useMap()
    const mapZoom = zoom || 0

    const minimap = useMemo(
        () => (
            <MapContainer
            style={{ height: 80, width: 80 }}
            center={parentMap.getCenter()}
            zoom={mapZoom}
            dragging={false}
            doubleClickZoom={false}
            scrollWheelZooom={false}
            attributopnControl={false}
            zoomControl = {false} >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Minimapbounds parentMap={parentMap} zoom={mapZoom} />
            </MapContainer>
        ),
        [],
    )
}
function MapCoords(){ 
    const [map, setMap] = useState(null)
    const animateRef = useRef(false)

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
        <LayersControl position="topright">
            <LayersControl.Overlay checked name="RED CIRCLES">
                <LayerGroup>
                 <Circle center={center} pathOptions={redOptions} radius={5000} />
                <CircleMarker center={[38.8113, -89.9557]} pathOptions={redOptions} radius={20}>
                    <Tooltip>Red Circle :o</Tooltip>
                </CircleMarker>
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Lime green lines">
                <LayerGroup>
                <Polyline pathOptions={limeOptions} positions={polyline} />
                <Polyline pathOptions={limeOptions} positions={multiPolyline} />
                <Polygon pathOptions={limeOptions} positions={polygon} />
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Blue circle">
                <LayerGroup>
                    <Circle center={[38.6312, -90.193313]} pathOptions={blueOptions} radius={100} >
                    <Tooltip> Work </Tooltip>
                    </Circle>
                </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Center">
                <LayerGroup>
                    <CircleMarker center={center} pathOptions={purpleOptions} radius={6}>
                        <Tooltip> Center </Tooltip>
                    </CircleMarker>
                </LayerGroup>
            </LayersControl.Overlay>
        </LayersControl>
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