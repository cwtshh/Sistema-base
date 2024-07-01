import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const ProtectedRouteAdmim = ({ element: Component }) => {
    const navigate = useNavigate();
    const { admin } = useAdminAuth();

    return admin ? <Component /> : <Navigate to='/admin/login' />;
}

export default ProtectedRouteAdmim