/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, FolderOpen, Users, Mail, Phone, Instagram, Facebook } from 'lucide-react';

const VasantVihar = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);

    const galleryImages = [
        '/images/club-pages-imgs/VasantVihar/1.jpg',
        '/images/club-pages-imgs/VasantVihar/3.jpg',
        '/images/club-pages-imgs/VasantVihar/4.jpg',
        '/images/club-pages-imgs/VasantVihar/5.jpg',
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">WE Club of Vasant Vihar</h1>
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

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">WE club of Vasant Vihar</h3>
                    <h4 className="text-lg text-gray-700 mb-1">Year of inception - 1999</h4>
                    <h4 className="text-lg text-gray-700 mb-1">Registration no. 0035147(GBR)</h4>
                    <h4 className="text-lg text-gray-700 mb-6">WE Charter President WE Rajalakshmi Iyer</h4>

                    <div className="mb-6 italic">
                        <p className="mb-4 leading-relaxed">
                            Originally established as Lioness Club of Vasant Vihar in the year 1999. Lioness Charter President WE Rachna Bothra. In 2017, the club was reestablished under the banner of The Association of 'WE' Clubs of India; At which time senior members of the club WE Rachna Bothra and WE Rajni Shetty became the Founders of ours WE District 323 A2 as they were instrumental in founding The Association of 'WE' Clubs of India.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            The Club started with 23 Members in the year 1999 and now has grown to 58 members.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            The WE Club of Vasant Vihar has built a strong and trusted presence among municipal schools in and around Chembur. Over the years, we have responded to appeals from school authorities and communities, providing support tailored to their evolving needs.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            Our initiatives include the donation of water coolers, projectors with screens, cupboards, computers, and other essential educational aids that enrich classroom learning. We have actively contributed to infrastructure development by building toilet blocks, repairing classrooms, enhancing drinking water facilities, and establishing fully-equipped science laboratories to promote experiential learning.
                        </p>

                        <p className="mb-4 leading-relaxed">
                            In addition, we have supported schools during sports events by providing t-shirts, drinking water, and logistics assistance. Recognizing that education is a right, not a privilege, we also extend financial assistance to deserving students, ensuring that economic constraints do not hinder their academic journey.
                        </p>

                        <p className="mb-6 leading-relaxed">
                            Beyond infrastructure and material aid, we foster holistic development by conducting workshops, health and hygiene drives, and awareness campaigns. Our mission is to create safe, inclusive, and well-equipped learning spaces that inspire children to dream big and achieve more.
                        </p>
                    </div>

                    <div className="border-t pt-6 font-semibold">
                        <p className="text-xl mb-4">📩 Connect With Us</p>
                        <p className="mb-2 flex items-center gap-2">
                            <Mail size={18} className="text-[#3E64FF]" />
                            Email: wevasantvihar@gmail.com
                        </p>
                        <p className="mb-4 flex items-center gap-2">
                            <Phone size={18} className="text-[#3E64FF]" />
                            Phone: Contact via email
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

export default VasantVihar;
