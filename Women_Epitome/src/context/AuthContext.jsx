import { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

const TOKEN_FRESH_MS = 5 * 60 * 1000; // 5 minutes

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const refreshingRef = useRef(false);

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            const storedAt = parseInt(localStorage.getItem('tokenTimestamp') || '0', 10);

            if (storedToken && storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
                setIsAuthenticated(true);
                setLoading(false);

                const age = Date.now() - storedAt;
                if (age > TOKEN_FRESH_MS && !refreshingRef.current) {
                    refreshingRef.current = true;
                    api.get('/auth/me')
                        .then(response => {
                            const freshUser = response.data.data.user;
                            setUser(freshUser);
                            localStorage.setItem('user', JSON.stringify(freshUser));
                            localStorage.setItem('tokenTimestamp', String(Date.now()));
                        })
                        .catch(error => {
                            if (error.response?.status === 401) logoutClean();
                        })
                        .finally(() => { refreshingRef.current = false; });
                }
            } else {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const logoutClean = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('tokenTimestamp');
    };

    // Now accepts email instead of username
    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.success) {
                const { user: userData, token: userToken } = response.data.data;
                setUser(userData);
                setToken(userToken);
                setIsAuthenticated(true);
                localStorage.setItem('token', userToken);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('tokenTimestamp', String(Date.now()));
                return { success: true, user: userData };
            }
            return { success: false, message: 'Login failed' };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => logoutClean();

    return (
        <AuthContext.Provider value={{ user, token, loading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};