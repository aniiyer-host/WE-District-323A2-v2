/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, MapPin, Calendar, Star } from 'lucide-react';
import api from '../../utils/api';
import Footer from '../Footer';

const AnushaktiRoyals = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);
    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    const galleryImages = [
        '/images/club-pages-imgs/AnushaktiRoyals/1.png',
        '/images/club-pages-imgs/AnushaktiRoyals/2.jpg',
        '/images/club-pages-imgs/AnushaktiRoyals/3.jpg',
        '/images/club-pages-imgs/AnushaktiRoyals/4.jpg',
    ];

    const fallbackEvents = [
        {
            title: 'Cancer Care & Nutrition Drive',
            description: 'Provided nutritious food, educational gowns, and essentials to children battling cancer at Access Life, Sandhuwadi, Chembur.',
            date: '2025-03-22',
            location: 'Chembur, Mumbai',
            coverImage: '/images/club-pages-imgs/AnushaktiRoyals/3.jpg',
            images: ['/images/club-pages-imgs/AnushaktiRoyals/3.jpg'],
            isFeatured: true
        },
        {
            title: 'Mega Health Check-up Camp',
            description: 'Comprehensive health screening for 82 adults covering BMI, sugar, PFT, homocysteine, PSA, lipid profile, and Vitamin D3.',
            date: '2025-02-15',
            location: 'Anushaktinagar, Mumbai',
            coverImage: '/images/club-pages-imgs/AnushaktiRoyals/2.jpg',
            images: ['/images/club-pages-imgs/AnushaktiRoyals/2.jpg'],
            isFeatured: false
        }
    ];

    const formatDate = (dateString) => {
        if (!dateString) return 'Date TBA';
        const dt = new Date(dateString);
        if (Number.isNaN(dt.getTime())) return 'Date TBA';
        return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/clubs/anushakti-royals');
                const club = res?.data?.data?.club;
                const normalized = (club?.events || []).map((event) => ({
                    title: event.title || 'Untitled Event',
                    description: event.description || 'Details coming soon.',
                    date: event.date || '',
                    location: event.location || 'Location TBA',
                    coverImage: event.coverImage || '',
                    images: event.images && event.images.length ? event.images : [],
                    isFeatured: Boolean(event.isFeatured)
                }));
                setEvents(normalized);
            } catch (err) {
                setEvents(fallbackEvents);
            } finally {
                setEventsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-pink-100 relative overflow-hidden">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <button
                    onClick={() => navigate('/clubs')}
                    className="flex items-center gap-2 text-purple-600 hover:text-pink-600 font-semibold transition-all hover:gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Clubs</span>
                </button>
            </div>

            {/* Hero Header */}
            <div className="relative">
                <div className="max-w-6xl mx-auto px-4 py-16 text-center">
                    <div className="inline-block mb-6 p-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
                        <img
                            src="/images/WE-emblem.png"
                            alt="Club Logo"
                            className="w-24 h-auto mx-auto"
                        />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-linear">
                        WE Club of Anushakti Royals
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-purple-600">
                        <Sparkles className="animate-pulse" size={20} />
                        <p className="text-xl font-medium">Empowering Communities Through Service & Unity</p>
                        <Sparkles className="animate-pulse" size={20} />
                    </div>
                </div>
            </div>

            {/* Club Info Section */}
            <section className="py-12 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-100 hover:shadow-purple-200/50 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-12 bg-linear-to-b from-purple-500 to-pink-500 rounded-full"></div>
                            <h2 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                About the Club
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">WE Club of Anushakti Royals</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        <span className="font-semibold">Year of inception:</span> 1989
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                        <span className="font-semibold">Registration:</span> E-0035123(GBR)
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        <span className="font-semibold">Reestablished:</span> Under the banner of The Association of WE Clubs of India in 2017
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm">
                                <p className="font-semibold text-purple-900 mb-4">
                                    <span className="text-purple-600">Charter President:</span> WE Prabha Agarwal
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Founded on June 8, 1989, originally as the Lioness Club of Anushaktinagar under the visionary leadership and Mentors WE Kawal Rekhi ji & WE Late Harbans Oberio and inaugurated by Late Lioness Shanti Shahani. The Club club proudly transitioned into the WE Club of Anushakti Royals in the year 2017, becoming a vibrant part of the Association of WE Clubs of India — a national platform symbolizing the power and purpose of women in service. And senior member WE Jyoti Jagasia became one of the Founders WE District 323A2.
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    We believe in the collective strength of women to uplift society. Through compassion, leadership, and dedicated action, the WE Club of Anushakti Royals actively contributes to causes that improve lives and foster community well-being.
                                </p>

                                <div className="bg-linear-to-r from-purple-100 to-pink-100 rounded-xl p-4 mt-4">
                                    <p className="font-semibold text-purple-800 mb-2">🌟 Key Service Projects:</p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Organized Free Mega Health Check-up Camp for 82 adults, covering vital tests including BMI, Sugar, PFT, Homocysteine, PSA, Lipid Profile, Vitamin D3, and more. Cancer Care & Nutrition for Children on 22nd March 2025 at Access Life, Sandhuwadi, Chembur. Mumbai. Provided nutritious food, educational gowns, and essentials to children battling cancer, reinforcing care with dignity and love.
                                    </p>
                                </div>

                                <div className="mt-6 border-t pt-6">
                                    <p className="font-semibold text-xl mb-4">📩 Connect With Us</p>
                                    <div className="space-y-2 text-gray-700">
                                        <p>📧 Email: weanushaktiroyals@gmail.com</p>
                                        <p>📱 Phone: +91 95949 61244</p>
                                        <p>📷 Instagram: @weanushaktiroyals</p>
                                        <p>📘 Facebook: WE Club of Anushakti Royals</p>
                                    </div>
                                    <p className="italic text-gray-700 mt-6">
                                        💬 "We rise by lifting others — together, we create a more compassionate and empowered society."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-12 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                            Events & Highlights
                        </h2>
                        <p className="text-purple-600">Latest initiatives from Anushakti Royals</p>
                    </div>

                    {eventsLoading ? (
                        <div className="text-center text-gray-600">Loading events...</div>
                    ) : events.length === 0 ? (
                        <div className="text-center text-gray-500">Events will appear here soon.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {events.map((event, idx) => (
                                <div
                                    key={`${event.title}-${idx}`}
                                    className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300"
                                >
                                    {event.coverImage || (event.images && event.images[0]) ? (
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={event.coverImage || event.images[0]}
                                                alt={event.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-purple-900/40 to-transparent" />
                                            {event.isFeatured && (
                                                <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full shadow">
                                                    <Star size={14} /> Featured
                                                </span>
                                            )}
                                        </div>
                                    ) : null}

                                    <div className="p-5 space-y-3">
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                                                {event.title}
                                            </h3>
                                            <span className="flex items-center gap-1 text-sm text-gray-600">
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

                                        {event.images && event.images.length > 1 && (
                                            <div className="flex gap-2 pt-2 overflow-x-auto">
                                                {event.images.slice(1).map((img, imgIdx) => (
                                                    <img
                                                        key={imgIdx}
                                                        src={img}
                                                        alt={`${event.title} ${imgIdx + 2}`}
                                                        className="w-20 h-20 object-cover rounded-lg border border-purple-100"
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                            Gallery
                        </h2>
                        <p className="text-purple-600">Moments that matter</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {galleryImages.map((img, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                                onClick={() => setEnlargedImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Event ${index + 1}`}
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enlarged Preview */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={() => setEnlargedImage(null)}
                >
                    <div className="relative">
                        <img
                            src={enlargedImage}
                            alt="Preview"
                            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
                        />
                        <button
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
                            onClick={() => setEnlargedImage(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}




            <Footer />

            <style jsx>{`
                @keyframes linear {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-linear {
                    background-size: 200% 200%;
                    animation: linear 3s ease infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default AnushaktiRoyals;
