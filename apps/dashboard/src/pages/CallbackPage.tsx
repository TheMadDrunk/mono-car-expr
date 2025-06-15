import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../services/authService';

const CallbackPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLoginCallback = async () => {
            try {
                await authService.completeLogin();
                // Redirect to home page after successful login
                navigate('/', { replace: true });
            } catch (error) {
                console.error('Login callback error:', error);
                // Redirect to error page if login fails
                navigate('/error', { replace: true, state: { error: 'Login failed' } });
            }
        };

        handleLoginCallback();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Logging you in...</h2>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            </div>
        </div>
    );
};

export default CallbackPage; 