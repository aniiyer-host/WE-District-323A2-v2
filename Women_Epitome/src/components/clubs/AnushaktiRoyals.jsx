/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, FolderOpen, Users, Mail, Phone, Instagram, Facebook } from 'lucide-react';

const AnushaktiRoyals = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);

    const galleryImages = [
        '/images/club-pages-imgs/AnushaktiRoyals/1.png',
        '/images/club-pages-imgs/AnushaktiRoyals/2.jpg',
        '/images/club-pages-imgs/AnushaktiRoyals/3.jpg',
        '/images/club-pages-imgs/AnushaktiRoyals/4.jpg',
    ];

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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">WE Club of Anushakti Royals</h1>
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

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">WE Club of Anushakti Royals</h3>
                    <h4 className="text-lg text-gray-700 mb-1">Year of inception: 1989</h4>
                    <h4 className="text-lg text-gray-700 mb-1">Registration no. E-0035123(GBR)</h4>
                    <h4 className="text-lg text-gray-700 mb-6">Reestablished Under the banner of The Association of WE Clubs of India in 2017.</h4>

                    <div className="mb-6 italic">
                        <p className="font-semibold mb-4">Charter President: WE Prabha Agarwal</p>

                        <p className="mb-4 leading-relaxed">
                            Founded on June 8, 1989, originally as the Lioness Club of Anushaktinagar under the visionary leadership and Mentors WE Kawal Rekhi ji & WE Late Harbans Oberio and inaugurated by Late Lioness Shanti Shahani. The Club club proudly transitioned into the WE Club of Anushakti Royals in the year 2017, becoming a vibrant part of the Association of WE Clubs of India — a national platform symbolizing the power and purpose of women in service. And senior member WE Jyoti Jagasia became one of the Founders WE District 323A2.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            We believe in the collective strength of women to uplift society. Through compassion, leadership, and dedicated action, the WE Club of Anushakti Royals actively contributes to causes that improve lives and foster community well-being.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            <strong>Key Service Projects:</strong><br />
                            Organized Free Mega Health Check-up Camp for 82 adults, covering vital tests including BMI, Sugar, PFT, Homocysteine, PSA, Lipid Profile, Vitamin D3, and more —
                        </p>

                        <p className="mb-4 leading-relaxed">
                            Cancer Care & Nutrition for Children on 22nd March 2025 at Access Life, Sandhuwadi, Chembur. Mumbai. Provided nutritious food, educational gowns, and essentials to children battling cancer, reinforcing care with dignity and love.
                        </p>

                        <p className="mb-6 font-semibold">Our Tagline: Empowering Women, Uplifting Communities</p>
                    </div>

                    <div className="border-t pt-6 font-semibold">
                        <p className="text-xl mb-4">📩 Connect With Us</p>
                        <p className="mb-2 flex items-center gap-2">
                            <Mail size={18} className="text-[#3E64FF]" />
                            Email: weanushaktiroyals@gmail.com
                        </p>
                        <p className="mb-2 flex items-center gap-2">
                            <Phone size={18} className="text-[#3E64FF]" />
                            Phone: +91 95949 61244
                        </p>
                        <p className="mb-2 flex items-center gap-2">
                            <Instagram size={18} className="text-[#3E64FF]" />
                            Instagram: @weanushaktiroyals
                        </p>
                        <p className="mb-4 flex items-center gap-2">
                            <Facebook size={18} className="text-[#3E64FF]" />
                            Facebook: WE Club of Anushakti Royals
                        </p>
                        <p className="italic text-gray-700 mt-6">
                            💬 "We rise by lifting others — together, we create a more compassionate and empowered society."
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
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

export default AnushaktiRoyals;
