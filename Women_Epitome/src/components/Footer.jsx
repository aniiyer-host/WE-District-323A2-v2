import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                        <img src="/images/WE-emblem.png" alt="WE Emblem" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">The Association of WE Clubs of India</p>
                        <p className="text-sm text-gray-400">WE District 323 A2</p>
                    </div>
                </div>
                <p className="text-gray-400 mb-4">Woman - Epitome of Service</p>
                <p className="text-sm text-gray-500">© 2025 WE - Woman Epitome of Service. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
