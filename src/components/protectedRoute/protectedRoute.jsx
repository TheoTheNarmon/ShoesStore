import React from 'react';
import { useAuth } from '../../context/authContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, authorizedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!user || (authorizedRoles && !authorizedRoles.includes(user.rol))) {
        return <Navigate to="/" replace />; 
    }

    return <>{children}</>;
};

export default ProtectedRoute;