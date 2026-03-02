/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react';
import { MapPin, Calendar, Star, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import api from '../utils/api';

// ── Lightbox ──────────────────────────────────────────────────────────────────
import { useGallery } from '../context/GalleryContext.jsx';

const Lightbox = ({ images, startIndex, onClose }) => {
    const [idx, setIdx] = useState(startIndex);
    const { setGalleryOpen } = useGallery();

    const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
    const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

    // Keyboard navigation + body lock
    useEffect(() => {
        setGalleryOpen(true);
        document.body.style.overflow = 'hidden';

        const handler = (e) => {
            if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
            else if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => {
            window.removeEventListener('keydown', handler);
            setGalleryOpen(false);
            document.body.style.overflow = '';
        };
    }, [prev, next, onClose, setGalleryOpen]);

    return (
        <div
            className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
        >
            {/* Close */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
                <X size={20} />
            </button>

            {/* Main image */}
            <div
                className="relative max-w-5xl w-full flex flex-col items-center gap-4"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative w-full flex items-center justify-center">
                    {images.length > 1 && (
                        <button
                            onClick={prev}
                            className="absolute left-2 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft size={22} />
                        </button>
                    )}

                    <img
                        key={idx}
                        src={images[idx]}
                        alt={`Image ${idx + 1} of ${images.length}`}
                        className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl"
                        style={{ animation: 'fadeIn 0.2s ease-out' }}
                    />

                    {images.length > 1 && (
                        <button
                            onClick={next}
                            className="absolute right-2 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                            <ChevronRight size={22} />
                        </button>
                    )}
                </div>

                {/* Counter */}
                <div className="bg-black/50 text-white text-sm px-4 py-1.5 rounded-full">
                    {idx + 1} / {images.length}
                </div>

                {/* Thumbnails strip */}
                {images.length > 1 && (
                    <div className="flex gap-2 flex-wrap justify-center">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setIdx(i)}
                                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === idx
                                    ? 'border-white scale-110 shadow-lg'
                                    : 'border-white/30 opacity-60 hover:opacity-100 hover:border-white/70'
                                    }`}
                            >
                                <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ── EventCard ─────────────────────────────────────────────────────────────────
const EventCard = ({ event }) => {
    const [lightboxIdx, setLightboxIdx] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date TBA';
        const dt = new Date(dateString);
        if (Number.isNaN(dt.getTime())) return 'Date TBA';
        return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    // Build full image list: cover first, then extras (deduped)
    const allImages = [
        ...(event.coverImage ? [event.coverImage] : []),
        ...(event.images || []).filter(img => img && img !== event.coverImage)
    ].filter(Boolean);

    const extraImages = allImages.slice(1); // images beyond cover

    return (
        <>
            <div className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300">
                {/* Cover image — clickable to open lightbox */}
                {allImages.length > 0 && (
                    <div
                        className="relative h-56 overflow-hidden cursor-pointer"
                        onClick={() => setLightboxIdx(0)}
                        title="Click to view photos"
                    >
                        <img
                            src={allImages[0]}
                            alt={event.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />

                        {/* Photo count badge */}
                        {allImages.length > 1 && (
                            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-black/60 text-white rounded-full backdrop-blur-sm">
                                <Images size={12} />
                                {allImages.length} photos
                            </span>
                        )}

                        {event.isFeatured && (
                            <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full shadow">
                                <Star size={14} /> Featured
                            </span>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-bold bg-black/40 px-3 py-1.5 rounded-full transition-opacity">
                                View Photos
                            </span>
                        </div>
                    </div>
                )}

                {/* Card body */}
                <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                            {event.title}
                        </h3>
                        <span className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
                            <Calendar size={16} className="text-purple-600" />
                            {formatDate(event.date)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-pink-600" />
                        <span>{event.location}</span>
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">
                        {event.description}
                    </p>

                    {/* Extra thumbnails — clickable */}
                    {extraImages.length > 0 && (
                        <div className="flex gap-2 pt-2 flex-wrap">
                            {extraImages.map((img, imgIdx) => (
                                <button
                                    key={imgIdx}
                                    onClick={() => setLightboxIdx(imgIdx + 1)} // +1 because cover is index 0
                                    className="w-20 h-20 rounded-lg overflow-hidden border-2 border-purple-100 hover:border-purple-400 hover:shadow-md transition-all group/thumb flex-shrink-0 relative"
                                    title="Click to view"
                                >
                                    <img
                                        src={img}
                                        alt={`${event.title} photo ${imgIdx + 2}`}
                                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/25 transition-colors duration-200 flex items-center justify-center">
                                        <span className="opacity-0 group-hover/thumb:opacity-100 text-white text-xs font-bold transition-opacity">View</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxIdx !== null && (
                <Lightbox
                    images={allImages}
                    startIndex={lightboxIdx}
                    onClose={() => setLightboxIdx(null)}
                />
            )}
        </>
    );
};

// ── ClubEventsSection ─────────────────────────────────────────────────────────
/**
 * Reusable Events & Highlights section for individual club pages.
 *
 * Props:
 *   clubId     - e.g. 'anushakti-royals'  (used for API call)
 *   clubLabel  - e.g. 'Anushakti Royals'  (shown in subtitle)
 *   fallbackEvents - array of event objects to show if API fails
 */
const ClubEventsSection = ({ clubId, clubLabel, fallbackEvents = [] }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get(`/clubs/${clubId}`);
                const club = res?.data?.data?.club;
                const normalized = (club?.events || []).map((ev) => ({
                    title: ev.title || 'Untitled Event',
                    description: ev.description || 'Details coming soon.',
                    date: ev.date || '',
                    location: ev.location || 'Location TBA',
                    coverImage: ev.coverImage || '',
                    images: ev.images && ev.images.length ? ev.images.filter(Boolean) : [],
                    isFeatured: Boolean(ev.isFeatured)
                }));
                setEvents(normalized.length ? normalized : fallbackEvents);
            } catch {
                setEvents(fallbackEvents);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clubId]);

    return (
        <section className="py-12 px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Events &amp; Highlights
                    </h2>
                    <p className="text-purple-600">Latest initiatives from {clubLabel}</p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white/90 rounded-2xl shadow-xl overflow-hidden border border-purple-100 animate-pulse">
                                <div className="h-56 bg-purple-100" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-purple-100 rounded w-3/4" />
                                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                                    <div className="h-4 bg-gray-100 rounded w-full" />
                                    <div className="h-4 bg-gray-100 rounded w-5/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">Events will appear here soon.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {events.map((event, idx) => (
                            <EventCard key={`${event.title}-${idx}`} event={event} />
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.97); }
                    to   { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
            `}</style>
        </section>
    );
};

export default ClubEventsSection;
export { EventCard, Lightbox };
