import { useState, useEffect } from 'react';
import { User } from 'oidc-client-ts';
import { authService } from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await authService.getUser();
            setUser(currentUser);
            setLoading(false);
        };
        loadUser();

        // Listen for user changes (e.g., silent renew, manual login/logout)
        const handleUserLoaded = (loadedUser: User) => setUser(loadedUser);
        const handleUserUnloaded = () => setUser(null);

        authService['userManager'].events.addUserLoaded(handleUserLoaded);
        authService['userManager'].events.addUserUnloaded(handleUserUnloaded);

        return () => {
            authService['userManager'].events.removeUserLoaded(handleUserLoaded);
            authService['userManager'].events.removeUserUnloaded(handleUserUnloaded);
        };
    }, []);

    const login = async () => {
        await authService.login();
    };

    const logout = async () => {
        await authService.logout();
    };

    return {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };
}; 