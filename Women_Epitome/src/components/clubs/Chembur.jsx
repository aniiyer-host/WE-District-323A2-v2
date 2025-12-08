/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

const Chembur = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);

    const galleryImages = [
        '/images/club-pages-imgs/Chembur/1.jpg',
        '/images/club-pages-imgs/Chembur/2.jpg',
        '/images/club-pages-imgs/Chembur/5.jpg',
        '/images/club-pages-imgs/Chembur/4.jpg',
    ];

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
                        WE Club of Chembur
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
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">WE Club of Chembur</h3>
                                <div className="space-y-2 text-gray-700">
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        <span className="font-semibold">Year of inception:</span> 1976
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                        <span className="font-semibold">Darpan ID:</span> MH/2024/0470946
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        <span className="font-semibold">CSR Registration No.:</span> CSR00071601
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                                        <span className="font-semibold">12A Registration:</span> AAATW4682JE20215
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        <span className="font-semibold">80G Registration:</span> AAATW4682JF20213
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm">
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Originally established as Lioness Club of Chembur in 1976. Reestablished as WE Club of Chembur in 2017 under the banner of The Association of 'WE' Clubs of India. With our senior member WE Kawal Rekhi as the Association Chief Founder and WE Saroja Mekal as the Multiple District Founder and WE Roopa Sharma as the senior most member of our club.
                                </p>

                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Traditionally, our focus been on education, as it is our belief that through education a positive change can be brought about. In fact, since inception in 2017, our yearly investment in this field has been higher than in any other. In this regard, we have 2 permanent projects viz., Gurukul and Balwadi.
                                </p>

                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mt-4 mb-4">
                                    <p className="font-semibold text-purple-800 mb-2">🌟 GURUKUL - PALGHAR</p>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        Gurukul is a unique project, situated in Jawahar, Palghar district of Maharashtra initially conceptualised by "Aai Shri Seva Bhavi Sanstha". It is quite like the gurukuls of ancient India. Gurukul was formed to provide education to orphans and especially talented children from underprivileged background, wherein these children would learn/hone their skills, under a shelter and sustenance.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        Our Club has sponsored 5 dwelling units. Each unit houses 6 children. As on date, the cost incurred for building these units is Rs.16.00 lacs. We could achieve this feat through the contributions of our club Members, Corporate CSR Funds and all our supporters.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        It is with pride; we note that the children are responding well and our faith in them is bearing fruits. Already one has been selected in the Police academy and 2 more have been sent for higher studies. Given the right framework, these students will grow up to be responsible citizens.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        In addition to dwelling units, a water tank, a goat shed with goats have been sponsored through our Association. Further our club is sponsoring for a well to make it self-sufficient in terms of water.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mt-4">
                                    <p className="font-semibold text-purple-800 mb-2">🌟 BALWADI</p>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        Balwadi, one of the marque projects of our Club. It has been in operation since 1986 (started by Lioness Club of Chembur). It primarily caters to underprivileged children or children from economically backward sections of society.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        The program is structured so as to enable the children to obtain admission in good schools. We have on an average 30-35 students of the age group of around 3 years. The children are provided with uniforms, books, and other accessories.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        The annual expenses for running the Balwadi, which include but are not limited to salaries of the teaching staff, uniforms, and maintenance, amount to approximately ₹2.50 lakhs. The entire expense is borne by the Club.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        Apart from education the members celebrate all major festivals with the children such as Diwali, Holi, Raksha Bandhan, Janmashtami, Independence Day, Christmas and such to inculcate values and a sense of oneness among the children. The children at such events perform and are treated to treats and gifts sponsored by the members of the Club.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        Further, we run periodic free health checks (dental and eye) for the children and their parents. Apart from educating the children, we also run awareness programs for the parents for which we invite eminent persons to deliver interactive talks.
                                    </p>
                                </div>

                                <div className="mt-6 border-t pt-6">
                                    <p className="font-semibold text-xl mb-4">📩 Connect With Us</p>
                                    <div className="space-y-2 text-gray-700">
                                        <p>📷 Instagram: @weclubofchembur</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-12 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
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
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

export default Chembur;
