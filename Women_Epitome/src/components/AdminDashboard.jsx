import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { LogOut, Shield, Plus, Edit, Trash2, Eye, Search } from 'lucide-react';

const AdminDashboard = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if not admin
        if (user && user.role !== 'admin') {
            navigate('/club-dashboard');
            return;
        }

        fetchClubs();
    }, [user, navigate]);

    const fetchClubs = async () => {
        try {
            const response = await api.get('/clubs');
            setClubs(response.data.data.clubs);
        } catch (error) {
            console.error('Error fetching clubs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDeleteClub = async (clubId) => {
        if (!window.confirm('Are you sure you want to delete this club?')) {
            return;
        }

        try {
            await api.delete(`/clubs/${clubId}`);
            fetchClubs(); // Refresh list
        } catch (error) {
            console.error('Error deleting club:', error);
            alert('Failed to delete club');
        }
    };

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.clubId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <Shield className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                                <p className="text-gray-600">Welcome back, {user?.username}!</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Search and Add */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-6">
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search clubs..."
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            />
                        </div>
                        <button
                            onClick={() => navigate('/admin-dashboard/create-club')}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            <Plus size={20} />
                            Add Club
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6">
                        <div className="text-gray-600 text-sm font-medium mb-1">Total Clubs</div>
                        <div className="text-4xl font-bold text-purple-600">{clubs.length}</div>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6">
                        <div className="text-gray-600 text-sm font-medium mb-1">Active Clubs</div>
                        <div className="text-4xl font-bold text-green-600">{clubs.filter(c => c.isActive).length}</div>
                    </div>
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6">
                        <div className="text-gray-600 text-sm font-medium mb-1">Your Role</div>
                        <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                            <Shield size={24} />
                            Administrator
                        </div>
                    </div>
                </div>

                {/* Clubs List */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">All Clubs</h2>

                    {filteredClubs.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">No clubs found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filteredClubs.map((club) => (
                                <div
                                    key={club.clubId}
                                    className="p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-400 hover:shadow-lg transition-all duration-200"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{club.name}</h3>
                                            <p className="text-sm text-gray-500">ID: {club.clubId}</p>
                                        </div>
                                        {club.isActive ? (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                                Inactive
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {club.description || 'No description available'}
                                    </p>

                                    <div className="text-sm text-gray-500 mb-4">
                                        <p><strong>President:</strong> {club.president?.name || 'N/A'}</p>
                                        <p><strong>Members:</strong> {club.members?.length || 0}</p>
                                        <p><strong>Events:</strong> {club.events?.length || 0}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => navigate(`/clubs/${club.clubId}`)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                        <button
                                            onClick={() => navigate(`/admin-dashboard/edit-club/${club.clubId}`)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClub(club.clubId)}
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
