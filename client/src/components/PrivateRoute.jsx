import React from 'react';

import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  element = <></>,
  fallbackRoute = '/login',
}) {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to={fallbackRoute} />;
}
