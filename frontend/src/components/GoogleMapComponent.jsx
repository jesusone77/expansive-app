import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332,
};

function GoogleMapComponent({ locations, focusedLocation }) {
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [clickPosition, setClickPosition] = useState(null);

  useEffect(() => {
    if (focusedLocation) {
      setCenter({ lat: focusedLocation.latitude, lng: focusedLocation.longitude });
      setSelected(focusedLocation);
    }
  }, [focusedLocation]);

  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setClickPosition({ lat, lng });
    setSelected(null); // Ocultar el InfoWindow anterior
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={handleMapClick}
      >
        {locations.map((loc) => (
          <Marker
            key={loc._id}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            onClick={() => setSelected(loc)}
          />
        ))}

        {clickPosition && (
          <Marker position={clickPosition} />
        )}  

        {selected && (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h4>{selected.name}</h4>
              <p>{selected.description}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;
