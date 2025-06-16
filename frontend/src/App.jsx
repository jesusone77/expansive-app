import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  LocationsPage from './pages/LocationsPage';
import AdminPage from './pages/AdminPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/locations" element={<LocationsPage />} />
         <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
