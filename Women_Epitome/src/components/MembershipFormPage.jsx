/* eslint-disable no-unused-vars */
import React from 'react';
import { ArrowLeft, UserPlus, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const MembershipFormPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .playfair {
          font-family: 'Playfair Display', serif;
        }
      `}</style>

            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-6">
                        JOIN OUR COMMUNITY
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
                            Become a
                        </span>
                        <br />
                        <span className="text-gray-800 playfair">Member</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
                        Join thousands of empowered women making a difference
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Info Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-purple-100 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 playfair">Make an Impact</h3>
                            <p className="text-gray-600">Join community projects that transform lives</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-purple-100 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 playfair">Connect & Grow</h3>
                            <p className="text-gray-600">Network with like-minded empowered women</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-purple-100 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 playfair">Lead the Change</h3>
                            <p className="text-gray-600">Develop leadership skills through service</p>
                        </div>
                    </div>

                    {/* Google Form Embed */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-4 playfair">
                                Membership Application Form
                            </h2>
                            <p className="text-gray-600">
                                Fill out the form below to start your journey with WE Clubs of India
                            </p>
                        </div>

                        {/* Google Form iframe */}
                        <div className="relative w-full" style={{ minHeight: '800px' }}>
                            <iframe
                                src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
                                width="100%"
                                height="800"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                className="rounded-xl"
                            >
                                Loading…
                            </iframe>
                        </div>

                        {/* Instructions */}
                        <div className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200">
                            <h3 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                Important Information
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 mt-1">•</span>
                                    <span>Please ensure all required fields are filled accurately</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 mt-1">•</span>
                                    <span>Your application will be reviewed by our team within 5-7 business days</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 mt-1">•</span>
                                    <span>You will receive a confirmation email once your membership is approved</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-purple-600 mt-1">•</span>
                                    <span>For any questions, please contact us at <a href="mailto:info@weclubs.org" className="text-purple-700 font-semibold hover:underline">info@weclubs.org</a></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MembershipFormPage;
