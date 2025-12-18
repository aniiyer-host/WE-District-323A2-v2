/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, MapPin, Calendar, Star } from 'lucide-react';
import api from '../../utils/api';
import Footer from '../Footer';

const VasantVihar = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);
    const [events, setEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    const galleryImages = [
        '/images/club-pages-imgs/VasantVihar/1.jpg',
        '/images/club-pages-imgs/VasantVihar/3.jpg',
        '/images/club-pages-imgs/VasantVihar/4.jpg',
        '/images/club-pages-imgs/VasantVihar/5.jpg',
    ];

    const fallbackEvents = [
        {
            title: 'Community Service Initiative',
            description: 'Details coming soon.',
            date: '',
            location: 'Thane, Mumbai',
            coverImage: '/images/club-pages-imgs/VasantVihar/1.jpg',
            images: ['/images/club-pages-imgs/VasantVihar/1.jpg'],
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
                const res = await api.get('/clubs/vasant-vihar');
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
                        WE Club of Vasant Vihar
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
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">WE Club of Vasant Vihar</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        <span className="font-semibold">Year of inception:</span> 1999
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                        <span className="font-semibold">Registration:</span> 0035147(GBR)
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm">
                                <p className="font-semibold text-purple-900 mb-4">
                                    <span className="text-purple-600">WE Charter President:</span> WE Rajalakshmi Iyer
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Originally established as Lioness Club of Vasant Vihar in the year 1999. Lioness Charter President WE Rachna Bothra. In 2017, the club was reestablished under the banner of The Association of 'WE' Clubs of India; At which time senior members of the club WE Rachna Bothra and WE Rajni Shetty became the Founders of ours WE District 323 A2 as they were instrumental in founding The Association of 'WE' Clubs of India.
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    The Club started with 23 Members in the year 1999 and now has grown to 58 members.
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    The WE Club of Vasant Vihar has built a strong and trusted presence among municipal schools in and around Chembur. Over the years, we have responded to appeals from school authorities and communities, providing support tailored to their evolving needs.
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Our initiatives include the donation of water coolers, projectors with screens, cupboards, computers, and other essential educational aids that enrich classroom learning. We have actively contributed to infrastructure development by building toilet blocks, repairing classrooms, enhancing drinking water facilities, and establishing fully-equipped science laboratories to promote experiential learning.
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    In addition, we have supported schools during sports events by providing t-shirts, drinking water, and logistics assistance. Recognizing that education is a right, not a privilege, we also extend financial assistance to deserving students, ensuring that economic constraints do not hinder their academic journey.
                                </p>

                                <p className="leading-relaxed text-gray-700">
                                    Beyond infrastructure and material aid, we foster holistic development by conducting workshops, health and hygiene drives, and awareness campaigns. Our mission is to create safe, inclusive, and well-equipped learning spaces that inspire children to dream big and achieve more.
                                </p>

                                <div className="mt-6 border-t pt-6">
                                    <p className="font-semibold text-xl mb-4">📩 Connect With Us</p>
                                    <div className="space-y-2 text-gray-700">
                                        <p>📧 Email: wevasantvihar@gmail.com</p>
                                        <p>📱 Phone: Contact via email</p>
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
                        <p className="text-purple-600">Latest initiatives from Vasant Vihar</p>
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

export default VasantVihar;
