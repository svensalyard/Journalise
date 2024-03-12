import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AuthRoute({ element: Element }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  return user ? <Navigate to="/" state={{ from: location }} replace /> : Element;
}

export default AuthRoute;
