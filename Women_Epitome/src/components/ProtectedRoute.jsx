import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireRole }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check role if specified
    if (requireRole && user?.role !== requireRole) {
        // Redirect to appropriate dashboard based on user role
        if (user?.role === 'admin') {
            return <Navigate to="/admin-dashboard" replace />;
        } else {
            return <Navigate to="/club-dashboard" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
