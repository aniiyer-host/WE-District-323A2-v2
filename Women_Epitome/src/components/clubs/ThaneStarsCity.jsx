/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const ThaneStarsCity = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);

    const galleryImages = [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 relative overflow-hidden">
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
                    <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                        WE Club of Thane Stars City
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
                            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                About the Club
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">WE Club of Thane Stars City</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        <span className="font-semibold">Year of inception:</span> 2025
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                        <span className="font-semibold">Registration:</span> Not yet Registered
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm">
                                <p className="font-semibold text-purple-900 mb-4">
                                    <span className="text-purple-600">Charter President:</span> WE Rohini Thakur<br />
                                    <span className="text-pink-600">Club Extension Chairperson:</span> WE Suvarna Ekbote
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Established in the month of March 2025, we are at the beginning of our journey towards social service. No. Of members at inception is 14 and we hope to increase the number in the coming year.
                                </p>

                                <p className="leading-relaxed text-gray-700">
                                    Our club aims to do community service through various initiatives, including: Child welfare, Disability support, Education, Environmental protection, Maternal and infant health, Senior citizen welfare, Skill development, Women's empowerment, Aid for those in need.
                                </p>

                                <div className="mt-6 border-t pt-6">
                                    <p className="font-semibold text-xl mb-4">📩 Connect With Us</p>
                                    <div className="space-y-2 text-gray-700">
                                        <p>📧 Email: wethanestarscity@gmail.com</p>
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

            {/* Gallery Section - No Images */}
            <section className="py-12 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                            Gallery
                        </h2>
                        <p className="text-purple-600">Moments that matter</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-purple-100">
                        <p className="text-gray-600 italic">Gallery images coming soon...</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 mt-20 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white text-center py-8">
                <p className="text-sm font-medium">© 2025 WE Club | All rights reserved.</p>
            </footer>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
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

export default ThaneStarsCity;
