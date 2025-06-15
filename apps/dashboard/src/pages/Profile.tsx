import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { authService } from '../services/authService';
import { User } from 'oidc-client-ts';

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = await authService.getUser();
            if (!currentUser) {
                navigate('/'); // Redirect to home if not logged in
            } else {
                setUser(currentUser);
            }
        };
        checkUser();
    }, [navigate]);

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Profile</h1>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-2">User Information</h2>
                        <div className="flex items-center space-x-4">
                            <img
                                src={user.profile.picture || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-lg font-medium">{user.profile.name || 'No name provided'}</p>
                                <p className="text-gray-600">{user.profile.email || 'No email provided'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-2">Access Token</h2>
                        <p className="font-mono text-sm break-all">
                            {user.access_token ? user.access_token.substring(0, 30) + '...' : 'N/A'}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-2">Scopes</h2>
                        <p className="text-gray-700">{user.scope}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-2">User Profile Claims</h2>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                            {JSON.stringify(user.profile, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 