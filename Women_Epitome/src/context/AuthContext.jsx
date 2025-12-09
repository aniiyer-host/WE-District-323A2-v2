import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
                setIsAuthenticated(true);

                // Verify token is still valid
                try {
                    const response = await api.get('/auth/me');
                    setUser(response.data.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                } catch (error) {
                    console.error('Token verification failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });

            if (response.data.success) {
                const { user: userData, token: userToken } = response.data.data;

                setUser(userData);
                setToken(userToken);
                setIsAuthenticated(true);

                // Store in localStorage
                localStorage.setItem('token', userToken);
                localStorage.setItem('user', JSON.stringify(userData));

                return { success: true, user: userData };
            }
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
