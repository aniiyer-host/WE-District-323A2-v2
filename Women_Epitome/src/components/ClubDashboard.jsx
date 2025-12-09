import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { LogOut, Users, Edit, Eye, Crown, Search, Lock } from 'lucide-react';

const ClubDashboard = () => {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if admin
        if (user && user.role === 'admin') {
            navigate('/admin-dashboard');
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

    const isOwnClub = (clubId) => {
        return user?.clubId === clubId;
    };

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.clubId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Find user's own club
    const ownClub = clubs.find(club => club.clubId === user?.clubId);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <Users className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Club Dashboard</h1>
                                <p className="text-gray-600">Welcome, {user?.username}!</p>
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

                {/* Your Club Highlight */}
                {ownClub && (
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-6 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Crown size={32} />
                            <h2 className="text-2xl font-bold">Your Club</h2>
                        </div>
                        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6">
                            <h3 className="text-3xl font-bold mb-2">{ownClub.name}</h3>
                            <p className="text-white/90 mb-4">{ownClub.description || 'No description available'}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white/20 rounded-xl p-3">
                                    <div className="text-sm opacity-90">President</div>
                                    <div className="font-bold truncate">{ownClub.president?.name || 'N/A'}</div>
                                </div>
                                <div className="bg-white/20 rounded-xl p-3">
                                    <div className="text-sm opacity-90">Members</div>
                                    <div className="font-bold">{ownClub.members?.length || 0}</div>
                                </div>
                                <div className="bg-white/20 rounded-xl p-3">
                                    <div className="text-sm opacity-90">Events</div>
                                    <div className="font-bold">{ownClub.events?.length || 0}</div>
                                </div>
                                <div className="bg-white/20 rounded-xl p-3">
                                    <div className="text-sm opacity-90">Photos</div>
                                    <div className="font-bold">{ownClub.images?.length || 0}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/club-dashboard/edit/${ownClub.clubId}`)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                <Edit size={20} />
                                Edit Your Club
                            </button>
                        </div>
                    </div>
                )}

                {/* Search */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search all clubs..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {/* All Clubs */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">All Clubs</h2>

                    {filteredClubs.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-lg">No clubs found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filteredClubs.map((club) => {
                                const canEdit = isOwnClub(club.clubId);

                                return (
                                    <div
                                        key={club.clubId}
                                        className={`p-6 border-2 rounded-2xl transition-all duration-200 ${canEdit
                                                ? 'border-purple-400 bg-purple-50/50 shadow-lg'
                                                : 'border-gray-200 hover:border-purple-200 hover:shadow-lg'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-xl font-bold text-gray-800">{club.name}</h3>
                                                    {canEdit && (
                                                        <Crown className="text-purple-500" size={20} />
                                                    )}
                                                </div>
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
                                            {canEdit ? (
                                                <button
                                                    onClick={() => navigate(`/club-dashboard/edit/${club.clubId}`)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                                >
                                                    <Edit size={16} />
                                                    Edit
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                                                >
                                                    <Lock size={16} />
                                                    Locked
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClubDashboard;
