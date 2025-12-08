/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, FolderOpen, Users, Mail, Phone, Instagram, Facebook } from 'lucide-react';

const NewPanvelSteelTown = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);

    const galleryImages = [
        '/images/club-pages-imgs/NPST/1.jpg',
        '/images/club-pages-imgs/NPST/2.jpg',
        '/images/club-pages-imgs/NPST/3.jpg',
        '/images/club-pages-imgs/NPST/4.jpg',
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">WE Club of New Panvel Steel Town</h1>
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

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">WE Club of New Panvel Steel Town District 323 A2</h3>
                    <h4 className="text-lg text-gray-700 mb-1">Year of Inception (Lioness Year): 1995</h4>
                    <h4 className="text-lg text-gray-700 mb-1">Registration No.: E1382</h4>
                    <h4 className="text-lg text-gray-700 mb-1">Charter President: WE Pushpalata Zambre</h4>
                    <h4 className="text-lg text-gray-700 mb-1">80G & 12A Certification: YES</h4>
                    <h4 className="text-lg text-gray-700 mb-6">No. of Members: 32</h4>

                    <div className="mb-6 italic">
                        <p className="mb-4 leading-relaxed">
                            WE Club of New Panvel Steel Town, established in 1995, has a long-standing legacy of impactful community service. Officially registered and certified under 80G and 12A, the club has consistently maintained audited accounts since its inception.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            Over the last few years, especially after acquiring registration and tax exemption status, the club has successfully executed several large-scale, need-based projects with significant social impact. Our mission is rooted in grassroots-level involvement, reaching out to underprivileged communities and supporting causes that promote self-reliance, education, and health.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            <strong>Key CSR Projects in the past few Years:</strong>
                        </p>
                        <ul className="list-disc list-inside mb-4 space-y-2 text-sm leading-relaxed">
                            <li>Distributed bags, water bottles, compass boxes, and caps to 1000 rural students.</li>
                            <li>Goat Shed Construction in Palghar Gurukul to promote self-reliance.</li>
                            <li>Donated 10 benches to Panvel Railway Station. Donated chairs, a water cooler, and storage cabinets.</li>
                            <li>Conducted a 1-month course for 10 underprivileged women with vanity kits.</li>
                            <li>Conducted a 2-month course for 20 women, provided free sewing machines with motors and sewing kits.</li>
                            <li>Installed a Water Filtration Plant for daily langer preparation for 400 people.</li>
                            <li>Installed a 1.5-ton Air Conditioner at Gurudwar's free medical centre.</li>
                            <li>Set up a rent-free medical equipment centre with 37 units including wheelchairs, walkers, hospital beds and commodes etc.</li>
                            <li>Library Corners, Toy banks in 25 ZP Schools.</li>
                            <li>Donation of Cupboards to 24 ZP Schools.</li>
                            <li>Offered free four-wheeler driving lessons to 20 underprivileged women.</li>
                            <li>Gifted over 250 walking sticks to senior citizens.</li>
                        </ul>

                        <p className="mb-4 leading-relaxed">
                            These initiatives showcase our commitment to meaningful service, promoting education, skill development, senior care, and community health.
                        </p>

                        <p className="mb-6 leading-relaxed">
                            <strong>Legacy & Vision:</strong><br />
                            Our club has built a strong reputation as a team of dedicated women working at the grassroots level in and around Panvel. Through collaborative efforts and visionary leadership, we continue to uplift lives and create lasting impact.
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

export default NewPanvelSteelTown;
