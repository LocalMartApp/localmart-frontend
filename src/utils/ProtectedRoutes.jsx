import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const {authToken} = useAuth()

    return authToken ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedRoutes