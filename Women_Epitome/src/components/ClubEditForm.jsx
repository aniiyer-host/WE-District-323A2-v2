import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Save, X, Plus, Trash2, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { uploadImageToImageKit } from '../utils/api';

const ClubEditForm = () => {
    const { clubId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        president: {
            name: '',
            photo: '',
            bio: '',
            email: '',
            phone: ''
        },
        members: [],
        events: [],
        images: [],
        coverImage: '',
        logo: '',
        established: ''
    });

    // Check permissions
    const canEdit = user?.role === 'admin' || user?.clubId === clubId;

    useEffect(() => {
        if (!canEdit) {
            navigate('/club-dashboard');
            return;
        }
        fetchClubData();
    }, [clubId, canEdit, navigate]);

    const fetchClubData = async () => {
        try {
            const response = await api.get(`/clubs/${clubId}`);
            const club = response.data.data.club;
            setFormData({
                name: club.name || '',
                description: club.description || '',
                president: club.president || { name: '', photo: '', bio: '', email: '', phone: '' },
                members: club.members || [],
                events: (club.events || []).map((event) => ({
                    title: event.title || '',
                    description: event.description || '',
                    date: event.date ? event.date.split('T')[0] : '',
                    location: event.location || '',
                    category: event.category || '',
                    coverImage: event.coverImage || '',
                    images: event.images || [''],
                    isFeatured: true
                })),
                images: club.images || [],
                coverImage: club.coverImage || '',
                logo: club.logo || '',
                established: club.established ? club.established.split('T')[0] : ''
            });
        } catch (error) {
            console.error('Error fetching club:', error);
            setError('Failed to load club data');
        } finally {
            setLoading(false);
        }
    };

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

    const handleAddMember = () => {
        setFormData(prev => ({
            ...prev,
            members: [...prev.members, { name: '', designation: 'Member', photo: '', bio: '' }]
        }));
    };

    const handleMemberChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.map((member, i) =>
                i === index ? { ...member, [field]: value } : member
            )
        }));
    };

    const handleRemoveMember = (index) => {
        setFormData(prev => ({
            ...prev,
            members: prev.members.filter((_, i) => i !== index)
        }));
    };

    const handleAddEvent = () => {
        setFormData(prev => ({
            ...prev,
            events: [...prev.events, {
                title: '',
                description: '',
                date: '',
                location: '',
                category: '',
                coverImage: '',
                images: [''],
                isFeatured: true
            }]
        }));
    };

    const handleEventChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            events: prev.events.map((event, i) =>
                i === index ? { ...event, [field]: value } : event
            )
        }));
    };

    const handleRemoveEvent = (index) => {
        setFormData(prev => ({
            ...prev,
            events: prev.events.filter((_, i) => i !== index)
        }));
    };

    const handleAddEventImage = (eventIndex) => {
        setFormData(prev => ({
            ...prev,
            events: prev.events.map((event, i) =>
                i === eventIndex
                    ? { ...event, images: [...(event.images || []), ''] }
                    : event
            )
        }));
    };

    const handleEventImageChange = (eventIndex, imageIndex, value) => {
        setFormData(prev => ({
            ...prev,
            events: prev.events.map((event, i) =>
                i === eventIndex
                    ? {
                        ...event,
                        images: (event.images || []).map((img, imgIdx) => imgIdx === imageIndex ? value : img)
                    }
                    : event
            )
        }));
    };

    const handleRemoveEventImage = (eventIndex, imageIndex) => {
        setFormData(prev => ({
            ...prev,
            events: prev.events.map((event, i) =>
                i === eventIndex
                    ? {
                        ...event,
                        images: (event.images || []).filter((_, imgIdx) => imgIdx !== imageIndex)
                    }
                    : event
            )
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            await api.put(`/clubs/${clubId}`, formData);
            setSuccess('Club updated successfully!');
            setTimeout(() => {
                navigate(user.role === 'admin' ? '/admin-dashboard' : '/club-dashboard');
            }, 1500);
        } catch (error) {
            console.error('Error updating club:', error);
            setError(error.response?.data?.message || 'Failed to update club');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-600 via-pink-500 to-orange-400 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Edit Club: {formData.name}</h1>
                    <p className="text-gray-600">Club ID: {clubId}</p>
                </div>

                {/* Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <p className="text-green-700">{success}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Club Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Established Date</label>
                                <input
                                    type="date"
                                    name="established"
                                    value={formData.established}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Events Section */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Events</h2>
                            <button
                                type="button"
                                onClick={handleAddEvent}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Plus size={20} />
                                Add Event
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.events.map((event, index) => (
                                <div key={index} className="p-4 border-2 border-gray-200 rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-semibold text-gray-700">Event {index + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEvent(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Event Title */}
                                        <input
                                            type="text"
                                            placeholder="Event Title"
                                            value={event.title}
                                            onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />

                                        {/* Project Category */}
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Project Category</label>
                                            <select
                                                value={event.category || ''}
                                                onChange={(e) => handleEventChange(index, 'category', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="anaajdaan">Anaaj Daan Relieve the Hunger</option>
                                                <option value="senior-citizen">Senior Citizen</option>
                                                <option value="health">Health</option>
                                                <option value="education">Education</option>
                                                <option value="permanent-projects">Permanent Projects</option>
                                                <option value="rural-development">Rural Development</option>
                                                <option value="animal-welfare">Animal Welfare</option>
                                                <option value="specially-abled">Enable the Specially Abled</option>
                                                <option value="needy">Help the Needy</option>
                                                <option value="child-welfare">Child Welfare</option>
                                                <option value="women-welfare">Women Welfare</option>
                                                <option value="image-building">Image Building</option>
                                            </select>
                                        </div>

                                        {/* Event Cover Image */}
                                        <div>
                                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Event Cover Image</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        try {
                                                            const url = await uploadImageToImageKit(file, `/clubs/${clubId}/events`);
                                                            handleEventChange(index, 'coverImage', url);
                                                        } catch (err) {
                                                            setError(err.message || 'Cover upload failed');
                                                        }
                                                    }}
                                                    className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 file:font-semibold hover:file:bg-purple-100 file:cursor-pointer"
                                                />
                                                {event.coverImage && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEventChange(index, 'coverImage', '')}
                                                        className="p-2 text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                            {event.coverImage && (
                                                <div className="mt-2">
                                                    <img
                                                        src={event.coverImage}
                                                        alt="Cover"
                                                        className="w-32 h-20 object-cover rounded-lg border"
                                                        onError={(e) => {
                                                            console.error('Failed to load cover image:', event.coverImage);
                                                            e.target.style.display = 'none';
                                                        }}
                                                        onLoad={() => console.log('Cover image loaded successfully:', event.coverImage)}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                type="date"
                                                value={event.date ? event.date.split('T')[0] : ''}
                                                onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                value={event.location}
                                                onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                            />
                                        </div>
                                        <textarea
                                            placeholder="Description"
                                            value={event.description}
                                            onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                                            rows="2"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-semibold text-gray-700">Event Images</label>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddEventImage(index)}
                                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                                                >
                                                    <Plus size={16} />
                                                    Add Image
                                                </button>
                                            </div>

                                            {(event.images && event.images.length ? event.images : ['']).map((image, imageIndex) => (
                                                <div key={imageIndex} className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (!file) return;
                                                                try {
                                                                    const url = await uploadImageToImageKit(file, `/clubs/${clubId}/events`);
                                                                    handleEventImageChange(index, imageIndex, url);
                                                                } catch (err) {
                                                                    setError(err.message || 'Image upload failed');
                                                                }
                                                            }}
                                                            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 file:font-semibold hover:file:bg-purple-100 file:cursor-pointer"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveEventImage(index, imageIndex)}
                                                            className="p-2 text-red-500 hover:text-red-700"
                                                            aria-label="Remove image"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    {image && (
                                                        <div className="flex items-center gap-3">
                                                            <img src={image} alt={`Event ${index + 1} image ${imageIndex + 1}`} className="w-24 h-24 object-cover rounded-lg border" />
                                                            <span className="text-xs text-gray-500 break-all">{image}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {formData.events.length === 0 && (
                                <p className="text-center text-gray-500 py-4">No events added yet</p>
                            )}
                        </div>
                    </div>

                    {/* President Info */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">President Information</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.president.name}
                                    onChange={handlePresidentChange}
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

                    {/* Members Section */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Members</h2>
                            <button
                                type="button"
                                onClick={handleAddMember}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                <Plus size={20} />
                                Add Member
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.members.map((member, index) => (
                                <div key={index} className="p-4 border-2 border-gray-200 rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-semibold text-gray-700">Member {index + 1}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMember(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={member.name}
                                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Designation"
                                            value={member.designation}
                                            onChange={(e) => handleMemberChange(index, 'designation', e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        />
                                    </div>
                                </div>
                            ))}

                            {formData.members.length === 0 && (
                                <p className="text-center text-gray-500 py-4">No members added yet</p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                            >
                                <X size={20} />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save Changes
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

export default ClubEditForm;
