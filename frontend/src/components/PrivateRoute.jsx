// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { getToken } from '/auth';

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
