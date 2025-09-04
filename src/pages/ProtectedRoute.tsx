import React from 'react';
import useAuthContext from '../context/AuthHook';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute:React.FC = () => {
  const { isAutenticate} = useAuthContext();
  if(!isAutenticate) return <Navigate to="/" replace /> 
  return <Outlet/>;
}

export default ProtectedRoute
