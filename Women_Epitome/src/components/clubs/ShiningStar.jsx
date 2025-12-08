/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, FolderOpen, Users, Mail, Phone, Instagram, Facebook } from 'lucide-react';

const ShiningStar = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);

    const galleryImages = [];

    return (
        <div className="min-h-screen bg-[#ECFCFF]">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Verdana:wght@400;700&display=swap');
        body {
          font-family: 'Verdana', sans-serif;
        }
      `}</style>

            {/* Header */}
            <header className="bg-[#5EDFFF] text-[#3E64FF] text-center py-8 px-4">
                <img
                    src="/images/WE-emblem.png"
                    alt="Club Logo"
                    className="w-32 h-auto mx-auto mb-4"
                />
                <h1 className="text-3xl md:text-4xl font-bold mb-2">WE Club of Shining Star</h1>
                <p className="text-lg">Empowering Communities Through Service & Unity</p>
            </header>

            {/* Navigation */}
            <nav className="bg-[#B2FCFF] py-4">
                <ul className="flex flex-wrap justify-center gap-6 px-4">
                    <li>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-[#3E64FF] hover:text-[#5EDFFF] font-semibold transition-colors"
                        >
                            <Home size={18} />
                            Home
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/about')}
                            className="flex items-center gap-2 text-[#3E64FF] hover:text-[#5EDFFF] font-semibold transition-colors"
                        >
                            <Info size={18} />
                            About
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/projects')}
                            className="flex items-center gap-2 text-[#3E64FF] hover:text-[#5EDFFF] font-semibold transition-colors"
                        >
                            <FolderOpen size={18} />
                            Projects
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/clubs')}
                            className="flex items-center gap-2 text-[#3E64FF] hover:text-[#5EDFFF] font-semibold transition-colors"
                        >
                            <Users size={18} />
                            Clubs
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigate('/contact')}
                            className="flex items-center gap-2 text-[#3E64FF] hover:text-[#5EDFFF] font-semibold transition-colors"
                        >
                            <Mail size={18} />
                            Contact Us
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Club Info */}
            <section className="py-8 px-4 my-8 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-[#3E64FF] mb-6">About the Club</h2>

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">WE Club of Shining Star</h3>
                    <h4 className="text-lg text-gray-700 mb-1">Year of inception: 2024</h4>
                    <h4 className="text-lg text-gray-700 mb-6">Registration no.: Not yet Registered</h4>

                    <div className="mb-6 italic">
                        <p className="font-semibold mb-4">Charter President: WE Vijaya Gosavi</p>

                        <p className="mb-4 leading-relaxed">
                            Originally established as WE Club of Navi Mumbai Pride under the leadership of senior members WE Jayshree Murkunde, WE Deepa Khabdde in the year 2017.
                        </p>

                        <p className="mb-6 leading-relaxed">
                            With a membership of 12 members; our club works mainly in the fields of Environment, Senior Citizens and Aannajdaan. Our club will spare no efforts to increase membership strength and do our utmost in all fields of service to the society.
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            {galleryImages.length > 0 ? (
                <section className="py-8 px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#3E64FF] mb-6">Gallery</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {galleryImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Event ${index + 1}`}
                                onClick={() => setEnlargedImage(img)}
                                className="w-full h-full rounded-xl object-cover shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                            />
                        ))}
                    </div>
                </section>
            ) : (
                <section className="py-8 px-4 max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[#3E64FF] mb-6">Gallery</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <p className="text-gray-600 italic">Gallery images coming soon...</p>
                    </div>
                </section>
            )}

            {/* Enlarged Preview */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={() => setEnlargedImage(null)}
                >
                    <img
                        src={enlargedImage}
                        alt="Preview"
                        className="max-w-full max-h-[80vh] rounded-xl shadow-2xl"
                    />
                </div>
            )}

            {/* Footer */}
            <footer className="bg-[#5EDFFF] text-white text-center py-4 mt-12">
                <p>&copy; 2025 WE Club | All rights reserved.</p>
            </footer>
        </div>
    );
};

export default ShiningStar;
