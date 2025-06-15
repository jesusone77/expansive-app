import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon bug in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const LocationsPage = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/locations')
      .then(res => setLocations(res.data))
      .catch(err => console.error('Error cargando ubicaciones:', err));
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer center={[19.4326, -99.1332]} zoom={12} style={{ height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(loc => (
          <Marker key={loc._id} position={[loc.latitude, loc.longitude]}>
            <Popup>
              <strong>{loc.name}</strong><br />
              {loc.description}<br />
              <small>{loc.address}</small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationsPage;
