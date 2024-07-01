import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import Login from '../pages/login/Login';
import { useUserAuth } from '../context/UserAuthContext';

const ProtectedRoute = ({ element: Component }) => {
    const navigate = useNavigate();
    const { user } = useUserAuth();

    return user ? <Component /> : <Navigate to='/login' />;
}

export default ProtectedRoute