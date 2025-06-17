import { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapComponent from '../components/GoogleMapComponent';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth'; 



function LocationsPage() {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const toLogin = () => {
    navigate('/login');
  }

  useEffect(() => {
  axios.get(VITE_API_URL + '/api/locations/')
    .then(res => {
      console.log("Datos recibidos:", res.data);
      setLocations(res.data);
    })
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="h-screen flex flex-col">
     
      <header className="bg-white shadow-md flex items-center justify-between px-6 py-4 h-[16%]">
        <div className="text-xl font-bold">Expansive</div>
        <div className="text-gray-700">{user ? user.name : ''}</div>
        <div className="flex flex-col items-end space-y-2">
          <button 
          onClick={toLogin}  
          className="px-4 py-1 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/5 bg-gray-100 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Ubicaciones</h2>
          <ul className="space-y-2">
            {locations.map((loc) => (
              <li
                key={loc._id}
                className="cursor-pointer p-2 bg-white shadow rounded hover:bg-blue-100"
                onClick={() => setSelectedLocation(loc)}
              >
                {loc.name + " "}
                {loc.description}
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1">
          <GoogleMapComponent
            locations={locations}
            focusedLocation={selectedLocation}
          />
        </main>
      </div>
    </div>
  );
}

export default LocationsPage;
