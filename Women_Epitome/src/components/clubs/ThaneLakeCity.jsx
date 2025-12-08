/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Info, FolderOpen, Users, Mail, Phone, Instagram, Facebook } from 'lucide-react';

const ThaneLakeCity = () => {
    const navigate = useNavigate();
    const [enlargedImage, setEnlargedImage] = useState(null);

    const galleryImages = [
        '/images/club-pages-imgs/LakeCity/1.jpg',
        '/images/club-pages-imgs/LakeCity/2.jpg',
        '/images/club-pages-imgs/LakeCity/3.jpg',
        '/images/club-pages-imgs/LakeCity/4.jpg',
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
                <h1 className="text-3xl md:text-4xl font-bold mb-2">WE Club of Thane Lake City</h1>
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

                    <h3 className="text-2xl font-bold text-gray-800 mb-2">WE Club of Thane Lake City</h3>
                    <h4 className="text-lg text-gray-700 mb-1">Year of Inception: 2013</h4>
                    <h4 className="text-lg text-gray-700 mb-1">Registration Number: Not yet Registered</h4>
                    <h4 className="text-lg text-gray-700 mb-1">Originally established as a Lioness Club of Thane Lake City 2013-2017</h4>
                    <h4 className="text-lg text-gray-700 mb-6">Charter President - WE Jayashree Varhade</h4>

                    <div className="mb-6 italic">
                        <p className="mb-4 leading-relaxed">
                            <strong>Our Impactful Activities:</strong><br />
                            Starting with 14 members, the club has since grown to 33 members. At our core, we believe in making a tangible difference in the community.
                        </p>

                        <p className="mb-2 leading-relaxed"><strong>Child Welfare:</strong> We are dedicated to nurturing the well-being of children. Our initiatives include donating essential items like food, books, bicycles, clothes, and toys to underprivileged children, as well as providing support to signal school children.</p>

                        <p className="mb-2 leading-relaxed"><strong>Disability Support:</strong> We strive to empower individuals with disabilities. We provide wheelchairs to the physically challenged, assist them in opening bank accounts, and spend quality time with special needs children, distributing meals and snacks.</p>

                        <p className="mb-2 leading-relaxed"><strong>Education:</strong> Education is a cornerstone of our efforts. We've donated books to the new library at Shrimati Gujana English School, sponsored school fees for underprivileged children, and celebrate important festivals like Children's Day and Independence Day in schools. We also organize health and skill development camps to further support student growth.</p>

                        <p className="mb-2 leading-relaxed"><strong>Environment:</strong> We are committed to protecting our planet. Our environmental activities include sorting seeds and preparing saplings for regular tree plantation drives. In collaboration with Kiran Foundation Trust, Nagpur, we've also donated over 300 plants to the tribal women for the homestay project at Kolitmara and actively participate in tree plantation drives with other environmental organizations.</p>

                        <p className="mb-2 leading-relaxed"><strong>Girl Child Empowerment:</strong> Empowering the girl child is crucial. We proudly donated a sanitary pad vending and disposal machine to Shrimati Gujana English School, which serves underprivileged children in Azadnagar, Thane.</p>

                        <p className="mb-2 leading-relaxed"><strong>Maternal and Infant Health:</strong> We support the health of mothers and infants by distributing infant clothes and nutritious meals at civil hospitals.</p>

                        <p className="mb-2 leading-relaxed"><strong>Senior Citizens Welfare:</strong> We believe in honouring our elders. Our activities include organizing musical evenings at Old Age Homes and distributing snacks to residents, bringing joy and companionship.</p>

                        <p className="mb-2 leading-relaxed"><strong>Women Empowerment:</strong> We champion women's empowerment through practical skill development. In collaboration with Kiran Foundation Trust, Nagpur, we provide training to tribal women in Ghadchiroli in areas like jewellery making from collected seeds, painting and stitching cloth bags, and computer training for managing day-to-day finances.</p>

                        <p className="mb-6 leading-relaxed"><strong>Expansion:</strong> This year, the organization further expanded its reach with the establishment of a new chapter, the WE Club of Thane Stars City, which currently has 14 members.</p>
                    </div>

                    <div className="border-t pt-6 font-semibold">
                        <p className="text-xl mb-4">📩 Connect With Us</p>
                        <p className="mb-2 flex items-center gap-2">
                            <Mail size={18} className="text-[#3E64FF]" />
                            Email: wethanelakecity@gmail.com
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

export default ThaneLakeCity;
