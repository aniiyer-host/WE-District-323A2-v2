/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, FolderOpen, Users, Mail, Phone, Instagram, Facebook } from 'lucide-react';

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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">WE Club of Chembur</h1>
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

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">WE Club of Chembur</h3>
                    <h4 className="text-lg text-gray-700 mb-1">Year of inception: 1976</h4>
                    <h4 className="text-lg text-gray-700 mb-1">Darpan ID: MH/2024/0470946</h4>
                    <h4 className="text-lg text-gray-700 mb-1">CSR Registration No.: CSR00071601</h4>
                    <h4 className="text-lg text-gray-700 mb-1">12A Registration no.: AAATW4682JE20215</h4>
                    <h4 className="text-lg text-gray-700 mb-6">80G Registration no.: AAATW4682JF20213</h4>

                    <div className="mb-6 italic">
                        <p className="mb-4 leading-relaxed">
                            Originally established as Lioness Club of Chembur in 1976. Reestablished as WE Club of Chembur in 2017 under the banner of The Association of 'WE' Clubs of India. With our senior member WE Kawal Rekhi as the Association Chief Founder and WE Saroja Mekal as the Multiple District Founder and WE Roopa Sharma as the senior most member of our club.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            Traditionally, our focus been on education, as it is our belief that through education a positive change can be brought about. In fact, since inception in 2017, our yearly investment in this field has been higher than in any other. In this regard, we have 2 permanent projects viz., Gurukul and Balwadi.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            <strong>GURUKUL - PALGHAR</strong><br />
                            Gurukul is a unique project, situated in Jawahar, Palghar district of Maharashtra initially conceptualised by "Aai Shri Seva Bhavi Sanstha". It is quite like the gurukuls of ancient India. Gurukul was formed to provide education to orphans and especially talented children from underprivileged background, wherein these children would learn/hone their skills, under a shelter and sustenance.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            Our Club has sponsored 5 dwelling units. Each unit houses 6 children. As on date, the cost incurred for building these units is Rs.16.00 lacs. We could achieve this feat through the contributions of our club Members, Corporate CSR Funds and all our supporters.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            It is with pride; we note that the children are responding well and our faith in them is bearing fruits. Already one has been selected in the Police academy and 2 more have been sent for higher studies. Given the right framework, these students will grow up to be responsible citizens.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            In addition to dwelling units, a water tank, a goat shed with goats have been sponsored through our Association. Further our club is sponsoring for a well to make it self-sufficient in terms of water.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            <strong>BALWADI</strong><br />
                            Balwadi, one of the marque projects of our Club. It has been in operation since 1986 (started by Lioness Club of Chembur). It primarily caters to underprivileged children or children from economically backward sections of society.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            The program is structured so as to enable the children to obtain admission in good schools. We have on an average 30-35 students of the age group of around 3 years. The children are provided with uniforms, books, and other accessories.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            The annual expenses for running the Balwadi, which include but are not limited to salaries of the teaching staff, uniforms, and maintenance, amount to approximately ₹2.50 lakhs. The entire expense is borne by the Club.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            Apart from education the members celebrate all major festivals with the children such as Diwali, Holi, Raksha Bandhan, Janmashtami, Independence Day, Christmas and such to inculcate values and a sense of oneness among the children. The children at such events perform and are treated to treats and gifts sponsored by the members of the Club.
                        </p>

                        <p className="mb-6 leading-relaxed">
                            Further, we run periodic free health checks (dental and eye) for the children and their parents. Apart from educating the children, we also run awareness programs for the parents for which we invite eminent persons to deliver interactive talks.
                        </p>
                    </div>

                    <div className="border-t pt-6 font-semibold">
                        <p className="text-xl mb-4">📩 Connect With Us</p>
                        <p className="mb-4 flex items-center gap-2">
                            <Instagram size={18} className="text-[#3E64FF]" />
                            Instagram: @weclubofchembur
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

export default Chembur;
