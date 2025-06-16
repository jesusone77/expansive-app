import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, logout } from '/auth'; 
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate('/login');
    }
  }, []);

  //logout 
  const handleLogout = () => {      
    logout();  
    navigate('/');    
  };

  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/locations');
      setLocations(res.data);
    } catch (err) {
      console.error('Error al obtener ubicaciones');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/locations/${editingId}`, form, { headers: {
           Authorization: `Bearer ${getToken()}`
         }
        });
        setMessage('Ubicación actualizada correctamente.');
      } else {
        await axios.post('http://localhost:3001/api/locations', form, { headers: {
           Authorization: `Bearer ${getToken()}`
         }
        });
        setMessage('Ubicación creada correctamente.');
      }
      setForm({ name: '', address: '', latitude: '', longitude: '' });
      setEditingId(null);
      fetchLocations();
    } catch (err) {
      setMessage('Ocurrió un error al guardar.');
    }
  };

  const handleEdit = (loc) => {
    setForm(loc);
    setEditingId(loc._id);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que deseas eliminar esta ubicación?')) {
      try {
        await axios.delete(`http://localhost:3001/api/locations/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });
        fetchLocations();
        setMessage('Ubicación eliminada.');
      } catch (err) {
        setMessage('Error al eliminar.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-md">
        
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Panel de Administración</h1>
        <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className=" mb-4 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
        </div>
        {message && (
          <div className="mb-4 p-3 rounded text-white bg-green-600 text-sm">
            {message}
          </div>
        )}  

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <input
            className="p-3 border border-gray-300 rounded-md"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md"
            name="address"
            placeholder="Dirección"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md"
            name="latitude"
            type="number"
            placeholder="Latitud"
            value={form.latitude}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md"
            name="longitude"
            type="number"
            placeholder="Longitud"
            value={form.longitude}
            onChange={handleChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md"
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handleChange}
            required
          />
          <div className="col-span-1 md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-all"
            >
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>

        {loading ? (
          <p className="text-center text-gray-500">Cargando ubicaciones...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200 rounded-md shadow-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Dirección</th>
                  <th className="py-3 px-4 text-left">Latitud</th>
                  <th className="py-3 px-4 text-left">Longitud</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((loc) => (
                  <tr key={loc._id} className="border-t">
                    <td className="py-2 px-4">{loc.name}</td>
                    <td className="py-2 px-4">{loc.address}</td>
                    <td className="py-2 px-4">{loc.latitude}</td>
                    <td className="py-2 px-4">{loc.longitude}</td>
                    <td className="py-2 px-4 flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(loc)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(loc._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
