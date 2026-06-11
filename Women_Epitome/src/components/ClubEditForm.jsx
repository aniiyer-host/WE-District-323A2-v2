import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Save, Plus, Trash2, ArrowLeft, CheckCircle, CalendarX2 } from 'lucide-react';
import { uploadImageToImageKit, deleteImageFromImageKit } from '../utils/api';
import { useToast } from './Toast';

// Reusable save button shown at the bottom of each section
const SectionSaveButton = ({ onClick, saving, saved }) => (
    <div className="flex items-center justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
        {saved && (
            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium animate-pulse-once">
                <CheckCircle size={16} />
                Saved!
            </span>
        )}
        <button
            type="button"
            onClick={onClick}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
        >
            {saving ? (
                <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving…
                </>
            ) : (
                <>
                    <Save size={16} />
                    Save Changes
                </>
            )}
        </button>
    </div>
);

const ClubEditForm = () => {
    const { clubId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const [loading, setLoading] = useState(true);

    // Per-section saving & saved states
    const [basicSaving, setBasicSaving] = useState(false);
    const [eventsSaving, setEventsSaving] = useState(false);
    const [presidentSaving, setPresidentSaving] = useState(false);

    const [basicSaved, setBasicSaved] = useState(false);
    const [eventsSaved, setEventsSaved] = useState(false);
    const [presidentSaved, setPresidentSaved] = useState(false);

    // Tracks per-field upload progress
    const [uploading, setUploading] = useState({});
    const [cleaningUp, setCleaningUp] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        president: { name: '', photo: '', photo_file_id: '', bio: '', email: '', phone: '' },
        events: [],
        images: [],
        cover_image: '',
        logo: '',
        established: ''
    });

    const canEdit = user?.role === 'admin' || user?.club_id === clubId;

    useEffect(() => {
        if (!canEdit) { navigate('/club-dashboard'); return; }
        fetchClubData();
    }, [clubId, canEdit, navigate]);

    const fetchClubData = async () => {
        try {
            const response = await api.get(`/clubs/${clubId}`);
            const club = response.data.data.club;
            setFormData({
                name: club.name || '',
                description: club.description || '',
                president: {
                    name: club.president?.name || '',
                    photo: club.president?.photo || '',
                    photo_file_id: club.president?.photo_file_id || '',
                    bio: club.president?.bio || '',
                    email: club.president?.email || '',
                    phone: club.president?.phone || ''
                },
                // members intentionally omitted from client-side form
                events: (club.events || []).map(event => ({
                    title: event.title || '',
                    description: event.description || '',
                    date: event.date ? event.date.split('T')[0] : '',
                    location: event.location || '',
                    category: event.category || '',
                    cover_image: event.cover_image || '',
                    cover_image_file_id: event.cover_image_file_id || '',
                    // images stored as [{url, fileId}] objects or plain strings from DB
                    images: (event.images || []).map(img =>
                        typeof img === 'string' ? { url: img, fileId: '' } : img
                    ).filter(img => img.url),
                    isFeatured: true
                })),
                images: club.images || [],
                cover_image: club.cover_image || '',
                logo: club.logo || '',
                established: club.established ? club.established.split('T')[0] : ''
            });
        } catch (err) {
            console.error('Error fetching club:', err);
            toast.error('Failed to load club data. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    const saveSection = useCallback(async (patch, setSaving, setSaved) => {
        setSaving(true);
        setSaved(false);
        try {
            const serializeEvents = (events) =>
                events.map(ev => ({
                    ...ev,
                    images: (ev.images || []).map(img =>
                        typeof img === 'string' ? img : img.url
                    ).filter(Boolean)
                }));

            const fullPayload = {
                ...formData,
                events: serializeEvents(formData.events),
                ...patch,
            };

            if (patch.events) {
                fullPayload.events = serializeEvents(patch.events);
            }

            // Ensure members are not sent from client
            if (fullPayload.members) delete fullPayload.members;

            await api.put(`/clubs/${clubId}`, fullPayload);
            setSaved(true);
            toast.success('Changes saved!');
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error('Save error:', err);
            toast.error(err.response?.data?.message || 'Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    }, [clubId, formData, toast]);

    // ─── Input handlers ─────────────────────────────────────────────────────
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePresidentChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, president: { ...prev.president, [name]: value } }));
    };

    // members handlers removed — members are not editable in the UI

    const handleAddEvent = () =>
        setFormData(prev => ({ ...prev, events: [...prev.events, { title: '', description: '', date: '', location: '', category: '', cover_image: '', cover_image_file_id: '', images: [], isFeatured: true }] }));

    const handleEventChange = (index, field, value) =>
        setFormData(prev => ({ ...prev, events: prev.events.map((ev, i) => i === index ? { ...ev, [field]: value } : ev) }));

    // Delete event and clean up its images from ImageKit
    const handleRemoveEvent = async (index) => {
        const event = formData.events[index];

        // Collect all fileIds to delete (non-blocking)
        const fileIds = [
            event.cover_image_file_id,
            ...(event.images || []).map(img => (typeof img === 'object' ? img.fileId : ''))
        ].filter(Boolean);

        // Remove from local state immediately so UI is responsive
        setFormData(prev => ({ ...prev, events: prev.events.filter((_, i) => i !== index) }));

        // Delete images from ImageKit in background (best-effort)
        fileIds.forEach(fileId => deleteImageFromImageKit(fileId));
    };

    const handleAddEventImage = (eventIndex) =>
        setFormData(prev => ({
            ...prev,
            events: prev.events.map((ev, i) =>
                i === eventIndex ? { ...ev, images: [...(ev.images || []), { url: '', fileId: '' }] } : ev
            )
        }));

    const handleEventImageChange = (eventIndex, imageIndex, urlOrObj) =>
        setFormData(prev => ({
            ...prev,
            events: prev.events.map((ev, i) => {
                if (i !== eventIndex) return ev;
                const imgs = [...(ev.images || [])];
                const entry = typeof urlOrObj === 'object' ? urlOrObj : { url: urlOrObj, fileId: '' };
                if (imageIndex >= imgs.length) {
                    imgs.push(entry);  // append if index doesn't exist yet
                } else {
                    imgs[imageIndex] = entry;
                }
                return { ...ev, images: imgs };
            })
        }));

    const handleRemoveEventImage = (eventIndex, imageIndex) => {
        const img = formData.events[eventIndex]?.images?.[imageIndex];
        const fileId = typeof img === 'object' ? img.fileId : '';

        setFormData(prev => ({
            ...prev,
            events: prev.events.map((ev, i) =>
                i === eventIndex
                    ? { ...ev, images: (ev.images || []).filter((_, idx) => idx !== imageIndex) }
                    : ev
            )
        }));

        if (fileId) deleteImageFromImageKit(fileId);
    };

    const handleUpload = async (file, folder, onSuccess, uploadKey) => {
        if (!file) return;
        setUploading(prev => ({ ...prev, [uploadKey]: true }));
        try {
            const result = await uploadImageToImageKit(file, folder);
            onSuccess(result);
            toast.success('Image uploaded!');
        } catch (err) {
            toast.error(err.message || 'Upload failed. Please try again.');
        } finally {
            setUploading(prev => ({ ...prev, [uploadKey]: false }));
        }
    };

    // ─── Per-section save triggers ───────────────────────────────────────────
    const saveBasic = () => saveSection({ name: formData.name, description: formData.description, established: formData.established }, setBasicSaving, setBasicSaved);
    const saveEvents = () => saveSection({ events: formData.events }, setEventsSaving, setEventsSaved);
    const savePresident = () => saveSection({ president: formData.president }, setPresidentSaving, setPresidentSaved);
    // saveMembers removed

    // ─── Clean up past events ─────────────────────────────────────────────
    const handleCleanupPastEvents = async () => {
        if (!confirm('Remove all events whose date has already passed? This cannot be undone.')) return;
        setCleaningUp(true);
        try {
            const res = await api.delete(`/clubs/${clubId}/cleanup-past-events`);
            const { removed } = res.data.data;
            if (removed > 0) {
                toast.success(`Removed ${removed} past event(s).`);
                fetchClubData();
            } else {
                toast.info('No past events found.');
            }
        } catch (err) {
            console.error('Cleanup error:', err);
            toast.error(err.response?.data?.message || 'Failed to clean up past events.');
        } finally {
            setCleaningUp(false);
        }
    };

    // ────────────────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                <div className="text-white text-xl sm:text-2xl">Loading…</div>
            </div>
        );
    }

    const fileInputClass = "flex-1 min-w-0 px-2 sm:px-3 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all cursor-pointer text-xs sm:text-sm file:mr-2 sm:file:mr-4 file:py-1.5 file:px-2 sm:file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 file:text-purple-700 file:font-semibold hover:file:bg-purple-100 file:cursor-pointer";
    const inputClass = "w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm sm:text-base";
    const smallInputClass = "w-full px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm";

    const UploadSpinner = () => (
        <div className="flex items-center gap-2 text-purple-600 text-xs mt-1">
            <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            Uploading…
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-3 sm:p-6 pt-20 sm:pt-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">

                {/* ── Header ── */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                    <h1 className="text-xl sm:text-3xl font-bold text-gray-800 leading-tight">Edit Club: {formData.name}</h1>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Club ID: {clubId}</p>
                </div>

                {/* Global error */}

                {/* ── Basic Information ── */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">Basic Information</h2>

                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Club Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={inputClass} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className={inputClass + " resize-none"} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Established Date</label>
                            <input type="date" name="established" value={formData.established} onChange={handleInputChange} className={inputClass} />
                        </div>
                    </div>

                    <SectionSaveButton onClick={saveBasic} saving={basicSaving} saved={basicSaved} />
                </div>

                {/* ── Events ── */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-5 gap-2 flex-wrap">
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Events</h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                type="button"
                                onClick={handleCleanupPastEvents}
                                disabled={cleaningUp}
                                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-xs sm:text-sm font-medium flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {cleaningUp ? (
                                    <>
                                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Cleaning…
                                    </>
                                ) : (
                                    <>
                                        <CalendarX2 size={16} />
                                        Clean Up Past Events
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={handleAddEvent}
                                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
                            >
                                <Plus size={16} />
                                Add Event
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {formData.events.map((event, index) => (
                            <div key={index} className="p-3 sm:p-4 border-2 border-gray-200 rounded-xl">
                                {/* Event header */}
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-semibold text-gray-700 text-sm sm:text-base">Event {index + 1}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEvent(index)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        title="Delete event (also removes its images from storage)"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {/* Title */}
                                    <input
                                        type="text"
                                        placeholder="Event Title"
                                        value={event.title}
                                        onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                                        className={smallInputClass}
                                    />

                                    {/* Category */}
                                    <div>
                                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 block">Project Category</label>
                                        <select
                                            value={event.category || ''}
                                            onChange={(e) => handleEventChange(index, 'category', e.target.value)}
                                            className={smallInputClass + " bg-white"}
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

                                    {/* Cover Image */}
                                    <div>
                                        <label className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 block">Event Cover Image</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    handleUpload(
                                                        file,
                                                        `/clubs/${clubId}/events`,
                                                        ({ url, fileId }) => {
                                                            handleEventChange(index, 'cover_image', url);
                                                            handleEventChange(index, 'cover_image_file_id', fileId);
                                                        },
                                                        `cover-${index}`
                                                    );
                                                }}
                                                className={fileInputClass}
                                            />
                                            {event.cover_image && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (event.cover_image_file_id) deleteImageFromImageKit(event.cover_image_file_id);
                                                        handleEventChange(index, 'cover_image', '');
                                                        handleEventChange(index, 'cover_image_file_id', '');
                                                    }}
                                                    className="p-2 text-red-500 hover:text-red-700 flex-shrink-0"
                                                    title="Remove cover image"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        {uploading[`cover-${index}`] && <UploadSpinner />}
                                        {event.cover_image && (
                                            <div className="mt-2">
                                                <img
                                                    src={event.cover_image}
                                                    alt="Cover"
                                                    className="w-28 h-18 sm:w-32 sm:h-20 object-cover rounded-lg border"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Date & Location */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                        <input
                                            type="date"
                                            value={event.date ? event.date.split('T')[0] : ''}
                                            onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                                            className={smallInputClass}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Location"
                                            value={event.location}
                                            onChange={(e) => handleEventChange(index, 'location', e.target.value)}
                                            className={smallInputClass}
                                        />
                                    </div>

                                    {/* Description */}
                                    <textarea
                                        placeholder="Description"
                                        value={event.description}
                                        onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                                        rows="2"
                                        className={smallInputClass + " resize-none"}
                                    />

                                    {/* Extra Images */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs sm:text-sm font-semibold text-gray-700">Event Images</label>
                                            <button
                                                type="button"
                                                onClick={() => handleAddEventImage(index)}
                                                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs sm:text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 font-medium"
                                            >
                                                <Plus size={14} />
                                                Add Image
                                            </button>
                                        </div>

                                        {(event.images || []).map((image, imageIndex) => {
                                            const imgUrl = typeof image === 'object' ? image.url : image;
                                            const uploadKey = `img-${index}-${imageIndex}`;
                                            return (
                                                <div key={imageIndex} className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0];
                                                                handleUpload(
                                                                    file,
                                                                    `/clubs/${clubId}/events`,
                                                                    ({ url, fileId }) => handleEventImageChange(index, imageIndex, { url, fileId }),
                                                                    uploadKey
                                                                );
                                                            }}
                                                            className={fileInputClass}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveEventImage(index, imageIndex)}
                                                            className="p-2 text-red-500 hover:text-red-700 flex-shrink-0"
                                                            aria-label="Remove image"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    {uploading[uploadKey] && <UploadSpinner />}
                                                    {imgUrl && (
                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                            <img src={imgUrl} alt={`Event ${index + 1} image ${imageIndex + 1}`} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg border flex-shrink-0" />
                                                            <span className="text-xs text-gray-500 break-all line-clamp-3">{imgUrl}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {formData.events.length === 0 && (
                            <p className="text-center text-gray-500 py-4 text-sm">No events added yet. Click &quot;Add Event&quot; to begin.</p>
                        )}
                    </div>

                    <SectionSaveButton onClick={saveEvents} saving={eventsSaving} saved={eventsSaved} />
                </div>

                {/* ── President Information ── */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">President Information</h2>

                    <div className="space-y-3 sm:space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                            <input type="text" name="name" value={formData.president.name} onChange={handlePresidentChange} className={inputClass} required />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                <input type="email" name="email" value={formData.president.email} onChange={handlePresidentChange} className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                <input type="tel" name="phone" value={formData.president.phone} onChange={handlePresidentChange} className={inputClass} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                            <textarea name="bio" value={formData.president.bio} onChange={handlePresidentChange} rows="3" className={inputClass + " resize-none"} />
                        </div>

                        {/* President Photo — file upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">President Photo</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        handleUpload(
                                            file,
                                            `/clubs/${clubId}/president`,
                                            ({ url, fileId }) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    president: { ...prev.president, photo: url, photo_file_id: fileId }
                                                }));
                                            },
                                            'president-photo'
                                        );
                                    }}
                                    className={fileInputClass}
                                />
                                {formData.president.photo && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (formData.president.photo_file_id) deleteImageFromImageKit(formData.president.photo_file_id);
                                            setFormData(prev => ({
                                                ...prev,
                                                president: { ...prev.president, photo: '', photo_file_id: '' }
                                            }));
                                        }}
                                        className="p-2 text-red-500 hover:text-red-700 flex-shrink-0"
                                        title="Remove photo"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                            {uploading['president-photo'] && <UploadSpinner />}
                            {formData.president.photo && (
                                <div className="mt-2">
                                    <img
                                        src={formData.president.photo}
                                        alt="President"
                                        className="w-20 h-20 object-cover rounded-full border-2 border-purple-200"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <SectionSaveButton onClick={savePresident} saving={presidentSaving} saved={presidentSaved} />
                </div>

                {/* Members section removed from UI */}

            </div>
        </div>
    );
};

export default ClubEditForm;