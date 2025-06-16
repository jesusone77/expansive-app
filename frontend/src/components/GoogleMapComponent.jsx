import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 19.4326,
  lng: -99.1332,
};

function GoogleMapComponent({ locations, focusedLocation }) {
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState(defaultCenter);

  useEffect(() => {
    if (focusedLocation) {
      setCenter({ lat: focusedLocation.lat, lng: focusedLocation.lng });
      setSelected(focusedLocation);
    }
  }, [focusedLocation]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {locations.map((loc) => (
          <Marker
            key={loc._id}
            position={{ lat: loc.lat, lng: loc.lng }}
            onClick={() => setSelected(loc)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
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
