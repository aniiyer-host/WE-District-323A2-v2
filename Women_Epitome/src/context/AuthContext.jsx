import { createContext, useContext, useState, useEffect, useRef } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// How long (ms) a stored token is trusted without re-verifying with the server.
// After this window a background /auth/me call will silently refresh user data.
const TOKEN_FRESH_MS = 5 * 60 * 1000; // 5 minutes

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Track whether a background refresh is already in flight
    const refreshingRef = useRef(false);

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            const storedAt = parseInt(localStorage.getItem('tokenTimestamp') || '0', 10);

            if (storedToken && storedUser) {
                // Restore state immediately from localStorage — unblocks the UI right away
                const parsedUser = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(parsedUser);
                setIsAuthenticated(true);
                setLoading(false); // ← unblock render now, before any network call

                const age = Date.now() - storedAt;
                if (age > TOKEN_FRESH_MS && !refreshingRef.current) {
                    // Token is stale — verify in background without blocking
                    refreshingRef.current = true;
                    api.get('/auth/me')
                        .then(response => {
                            const freshUser = response.data.data.user;
                            setUser(freshUser);
                            localStorage.setItem('user', JSON.stringify(freshUser));
                            localStorage.setItem('tokenTimestamp', String(Date.now()));
                        })
                        .catch(error => {
                            console.error('Background token verification failed:', error);
                            // Only force logout if server explicitly says 401
                            if (error.response?.status === 401) {
                                logoutClean();
                            }
                        })
                        .finally(() => {
                            refreshingRef.current = false;
                        });
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

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });

            if (response.data.success) {
                const { user: userData, token: userToken } = response.data.data;

                // Update state & storage atomically
                setUser(userData);
                setToken(userToken);
                setIsAuthenticated(true);

                localStorage.setItem('token', userToken);
                localStorage.setItem('user', JSON.stringify(userData));
                // Record when we last verified — avoids an /auth/me call right after login
                localStorage.setItem('tokenTimestamp', String(Date.now()));

                return { success: true, user: userData };
            }

            return { success: false, message: 'Login failed' };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        logoutClean();
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
