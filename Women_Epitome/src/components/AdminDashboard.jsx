import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import {
    LogOut, Shield, Plus, Edit, Trash2, Eye, Search,
    Users, CheckCircle, XCircle, Clock, ChevronDown, Save, X,
    LayoutDashboard, FolderKanban, FileEdit
} from 'lucide-react';
import CmsEditor from './admin/CmsEditor';
import ProjectsManager from './admin/ProjectsManager';

// ── Small inline edit modal ───────────────────────────────────────────────────
const EditUserModal = ({ user, clubs, onSave, onClose }) => {
    const [role, setRole] = useState(user.role ?? 'club');
    const [clubId, setClubId] = useState(user.club_id ?? '');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await onSave(user.id, role, clubId);
        setSaving(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={22} /></button>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-semibold text-gray-800">{user.username}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <div className="relative">
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        <select
                            value={role}
                            onChange={e => { setRole(e.target.value); if (e.target.value === 'admin') setClubId(''); }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
                        >
                            <option value="club">Club</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                {role === 'club' && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Club</label>
                        <div className="relative">
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            <select
                                value={clubId}
                                onChange={e => setClubId(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none"
                            >
                                <option value="">Select club...</option>
                                {clubs.map(c => (
                                    <option key={c.club_id} value={c.club_id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || (role === 'club' && !clubId)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                        {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={18} />}
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

// ── Main Dashboard ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const [clubs, setClubs] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('clubs');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [actionLoading, setActionLoading] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role !== 'admin') { navigate('/club-dashboard'); return; }
        fetchAll();
    }, [user, navigate]);

    const fetchAll = async () => {
        setLoading(true);
        await Promise.all([fetchClubs(), fetchPending(), fetchAllUsers()]);
        setLoading(false);
    };

    const fetchClubs = async () => {
        try {
            const res = await api.get('/clubs');
            setClubs(res.data.data.clubs);
        } catch (e) { console.error(e); }
    };

    const fetchPending = async () => {
        try {
            const res = await api.get('/auth/pending');
            setPendingUsers(res.data.data.users);
        } catch (e) { console.error(e); }
    };

    const fetchAllUsers = async () => {
        try {
            const res = await api.get('/auth/users');
            setAllUsers(res.data.data.users);
        } catch (e) { console.error(e); }
    };

    // ── Pending actions
    const handleApprove = async (userId) => {
        setActionLoading(userId);
        try {
            await api.patch(`/auth/approve/${userId}`);
            setPendingUsers(prev => prev.filter(u => u.id !== userId));
            fetchAllUsers(); // refresh users list
        } catch { alert('Failed to approve user'); }
        finally { setActionLoading(null); }
    };

    const handleReject = async (userId) => {
        if (!window.confirm('Reject and delete this registration?')) return;
        setActionLoading(userId);
        try {
            await api.delete(`/auth/reject/${userId}`);
            setPendingUsers(prev => prev.filter(u => u.id !== userId));
        } catch { alert('Failed to reject user'); }
        finally { setActionLoading(null); }
    };

    // ── User management actions
    const handleSaveUser = async (userId, role, clubId) => {
        try {
            await api.patch(`/auth/users/${userId}`, { role, clubId });
            setAllUsers(prev => prev.map(u =>
                u.id === userId ? { ...u, role, club_id: role === 'club' ? clubId : null } : u
            ));
            setEditingUser(null);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update user');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Permanently delete this user? This cannot be undone.')) return;
        setActionLoading(userId);
        try {
            await api.delete(`/auth/users/${userId}`);
            setAllUsers(prev => prev.filter(u => u.id !== userId));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete user');
        } finally { setActionLoading(null); }
    };

    // ── Club actions
    const handleDeleteClub = async (clubId) => {
        if (!window.confirm('Are you sure you want to delete this club?')) return;
        try {
            await api.delete(`/clubs/${clubId}`);
            fetchClubs();
        } catch { alert('Failed to delete club'); }
    };

    const handleLogout = () => { logout(); navigate('/login'); };

    const filteredClubs = clubs.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.club_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUsers = allUsers.filter(u =>
        (u.username ?? '').toLowerCase().includes(userSearch.toLowerCase()) ||
        (u.email ?? '').toLowerCase().includes(userSearch.toLowerCase()) ||
        (u.club_id ?? '').toLowerCase().includes(userSearch.toLowerCase())
    );

    const tabs = [
        { key: 'clubs',    label: 'All Clubs',      icon: LayoutDashboard },
        { key: 'users',    label: 'All Users',       icon: Users,           count: allUsers.length },
        { key: 'pending',  label: 'Pending',         icon: Clock,           count: pendingUsers.length, alert: pendingUsers.length > 0 },
        { key: 'projects', label: 'Projects',        icon: FolderKanban },
        { key: 'cms',      label: 'Site Content',    icon: FileEdit },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    clubs={clubs}
                    onSave={handleSaveUser}
                    onClose={() => setEditingUser(null)}
                />
            )}

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
                        <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                            <LogOut size={20} /> Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Total Clubs', value: clubs.length, color: 'text-purple-600' },
                        { label: 'Active Clubs', value: clubs.filter(c => c.is_active).length, color: 'text-green-600' },
                        { label: 'Total Users', value: allUsers.length, color: 'text-blue-600' },
                        { label: 'Pending', value: pendingUsers.length, color: 'text-orange-500', onClick: () => setActiveTab('pending') },
                    ].map(({ label, value, color, onClick }) => (
                        <div key={label} onClick={onClick} className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-5 ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-orange-400' : ''} transition-all`}>
                            <div className="text-gray-500 text-xs font-medium mb-1">{label}</div>
                            <div className={`text-3xl font-bold ${color}`}>{value}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                                    activeTab === tab.key
                                        ? 'bg-white shadow-lg ' + (tab.alert ? 'text-orange-600' : 'text-purple-700')
                                        : 'bg-white/40 text-white hover:bg-white/60'
                                }`}
                            >
                                {Icon && <Icon size={16} />}
                                {tab.label}
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className={`text-xs rounded-full w-5 h-5 flex items-center justify-center text-white ${tab.alert ? 'bg-orange-500' : 'bg-purple-500'}`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* ── CLUBS TAB ── */}
                {activeTab === 'clubs' && (
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <div className="flex gap-4 items-center mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search clubs..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                            </div>
                            <button onClick={() => navigate('/admin-dashboard/create-club')} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                                <Plus size={20} /> Add Club
                            </button>
                        </div>
                        {filteredClubs.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No clubs found</div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {filteredClubs.map(club => (
                                    <div key={club.club_id} className="p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-400 hover:shadow-lg transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">{club.name}</h3>
                                                <p className="text-xs text-gray-400">ID: {club.club_id}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${club.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {club.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{club.description || 'No description'}</p>
                                        <div className="text-sm text-gray-500 mb-4 space-y-0.5">
                                            <p><strong>President:</strong> {club.president?.name || 'N/A'}</p>
                                            <p><strong>Members:</strong> {club.members?.length || 0} &nbsp;|&nbsp; <strong>Events:</strong> {club.events?.length || 0}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => navigate(`/clubs/${club.club_id}`)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm transition-colors"><Eye size={15} /> View</button>
                                            <button onClick={() => navigate(`/admin-dashboard/edit-club/${club.club_id}`)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm transition-colors"><Edit size={15} /> Edit</button>
                                            <button onClick={() => handleDeleteClub(club.club_id)} className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"><Trash2 size={15} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── USERS TAB ── */}
                {activeTab === 'users' && (
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <div className="flex gap-4 items-center mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input type="text" value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search by username, email or club..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" />
                            </div>
                        </div>

                        {filteredUsers.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">No users found</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="text-left border-b-2 border-gray-100">
                                            <th className="pb-3 pr-4 font-semibold text-gray-600">Username</th>
                                            <th className="pb-3 pr-4 font-semibold text-gray-600">Email</th>
                                            <th className="pb-3 pr-4 font-semibold text-gray-600">Role</th>
                                            <th className="pb-3 pr-4 font-semibold text-gray-600">Club</th>
                                            <th className="pb-3 pr-4 font-semibold text-gray-600">Joined</th>
                                            <th className="pb-3 font-semibold text-gray-600">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredUsers.map(u => (
                                            <tr key={u.id} className="hover:bg-purple-50/40 transition-colors">
                                                <td className="py-4 pr-4 font-medium text-gray-800">{u.username ?? '—'}</td>
                                                <td className="py-4 pr-4 text-gray-500 max-w-[180px] truncate">{u.email}</td>
                                                <td className="py-4 pr-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-pink-100 text-pink-700'}`}>
                                                        {u.role ?? '—'}
                                                    </span>
                                                </td>
                                                <td className="py-4 pr-4 text-gray-500">{u.club_id ?? '—'}</td>
                                                <td className="py-4 pr-4 text-gray-400 text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                                                <td className="py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingUser(u)}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-xs font-semibold transition-colors"
                                                        >
                                                            <Edit size={13} /> Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(u.id)}
                                                            disabled={actionLoading === u.id || u.id === user?.id}
                                                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs font-semibold transition-colors disabled:opacity-40"
                                                            title={u.id === user?.id ? "Can't delete yourself" : ''}
                                                        >
                                                            {actionLoading === u.id
                                                                ? <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                                                                : <Trash2 size={13} />
                                                            }
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* ── PENDING TAB ── */}
                {activeTab === 'pending' && (
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Clock className="text-orange-500" size={24} /> Pending Registrations
                        </h2>
                        {pendingUsers.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <CheckCircle size={48} className="mx-auto mb-3 text-green-400" />
                                <p className="text-lg font-medium">All caught up!</p>
                                <p className="text-sm">No pending registrations.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {pendingUsers.map(u => (
                                    <div key={u.id} className="p-5 border-2 border-orange-200 rounded-2xl bg-orange-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-gray-800">{u.username}</p>
                                            <p className="text-sm text-gray-500">{u.email}</p>
                                            <p className="text-sm text-purple-600 font-medium">Club: {u.club_id}</p>
                                            <p className="text-xs text-gray-400 mt-1">Registered: {new Date(u.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={() => handleApprove(u.id)} disabled={actionLoading === u.id} className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow hover:shadow-lg transition-all disabled:opacity-50">
                                                {actionLoading === u.id ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <CheckCircle size={18} />}
                                                Approve
                                            </button>
                                            <button onClick={() => handleReject(u.id)} disabled={actionLoading === u.id} className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow hover:shadow-lg transition-all disabled:opacity-50">
                                                <XCircle size={18} /> Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ── PROJECTS TAB ── */}
                {activeTab === 'projects' && (
                    <ProjectsManager />
                )}

                {/* ── CMS EDITOR TAB ── */}
                {activeTab === 'cms' && (
                    <CmsEditor />
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;