// Removed unused useState import as it's not used in this component
import './App.css'
// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Importing components from locally installed react-leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function MapApp() {
  return (
    // Simplified structure: MapContainer directly inside a styled div
    <div className="MapContainerWrapper">
       <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
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

export default MapApp;