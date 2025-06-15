import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { User } from 'oidc-client-ts';
import { authService } from '../services/authService';
import Layout from '../components/layout/Layout';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await authService.getUser();
            setUser(currentUser);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Layout>{children}</Layout>;
};

export default ProtectedRoute; 