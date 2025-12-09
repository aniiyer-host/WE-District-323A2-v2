import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Save, X, ArrowLeft } from 'lucide-react';

const ClubCreateForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        clubId: '',
        name: '',
        description: '',
        president: {
            name: '',
            photo: '',
            bio: '',
            email: '',
            phone: ''
        }
    });

    // Only admins can create clubs
    if (user?.role !== 'admin') {
        navigate('/club-dashboard');
        return null;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePresidentChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            president: {
                ...prev.president,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');

        // Validate clubId format (kebab-case)
        const clubIdRegex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
        if (!clubIdRegex.test(formData.clubId)) {
            setError('Club ID must be in kebab-case format (e.g., my-club-name)');
            setSaving(false);
            return;
        }

        try {
            await api.post('/clubs', formData);
            navigate('/admin-dashboard');
        } catch (error) {
            console.error('Error creating club:', error);
            setError(error.response?.data?.message || 'Failed to create club');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-6">
                    <button
                        onClick={() => navigate('/admin-dashboard')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Create New Club</h1>
                    <p className="text-gray-600">Add a new club to the district</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Club ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="clubId"
                                    value={formData.clubId}
                                    onChange={handleInputChange}
                                    placeholder="e.g., anushakti-royals"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Use lowercase letters and hyphens only (e.g., my-club-name)
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Club Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Anushakti Royals"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Brief description of the club"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* President Info */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            President Information <span className="text-red-500">*</span>
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.president.name}
                                    onChange={handlePresidentChange}
                                    placeholder="President's full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.president.email}
                                        onChange={handlePresidentChange}
                                        placeholder="president@example.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.president.phone}
                                        onChange={handlePresidentChange}
                                        placeholder="+91 1234567890"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.president.bio}
                                    onChange={handlePresidentChange}
                                    rows="3"
                                    placeholder="Brief bio about the president"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                                <input
                                    type="url"
                                    name="photo"
                                    value={formData.president.photo}
                                    onChange={handlePresidentChange}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin-dashboard')}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                            >
                                <X size={20} />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Create Club
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClubCreateForm;
