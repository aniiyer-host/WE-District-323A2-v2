/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Users, Award, ArrowRight, Calendar, MapPin, Zap, Target } from 'lucide-react';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const events = [
    {
      id: 1,
      title: "Annual Gala Celebration",
      date: "December 15, 2024",
      location: "Mumbai Convention Center",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      category: "Event"
    },
    {
      id: 2,
      title: "Community Health Drive",
      date: "January 10, 2025",
      location: "Chembur District",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      category: "Outreach"
    },
    {
      id: 3,
      title: "Leadership Workshop",
      date: "January 25, 2025",
      location: "WE District Office",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      category: "Workshop"
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Active Members" },
    { icon: Heart, value: "50+", label: "Projects Completed" },
    { icon: Award, value: "25+", label: "Years of Service" },
    { icon: Sparkles, value: "100K+", label: "Lives Impacted" }
  ];

  return (
    <div className="min-h-screen bg-n-to-br from-pink-50 via-purple-50 to-pink-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        .playfair {
          font-family: 'Playfair Display', serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-shimmer {
          background: linear-linear(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-3 mb-8 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-purple-200">
            <div className="w-50 h-50 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <img src="/images/WE-emblem.png" />
            </div>
            <div className="text-left">
              <p className="text-sm text-purple-800 font-bold">The Association of WE Clubs of India</p>
              <p className="text-xs text-gray-600 font-semibold">WE District 323 A2</p>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
              Woman
            </span>
            <br />
            <span className="text-gray-800 playfair">Epitome of Service</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
            Empowering women, transforming communities
          </p>
          
          <p className="text-2xl text-purple-700 mb-12 font-semibold">
            एकता में शक्ति • Stronger Together
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <button className="group bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              Join Our Movement
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-purple-200">
              Explore Projects
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100">
                <stat.icon className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-purple-600 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* President Spotlight */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              LEADERSHIP 2024-25
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Meet Our District President
            </h2>
            <div className="h-2 w-24 bg-linear-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-96 md:h-auto bg-linear-to-br from-purple-600 to-pink-600 p-8">
                <div className="absolute inset-8 bg-white/10 backdrop-blur-sm rounded-2xl border-4 border-white/30"></div>
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80"
                  alt="WE Varsha Vora"
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute bottom-12 left-12 right-12 z-20">
                  <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">WE Varsha Vora</h3>
                    <p className="text-purple-600 font-semibold">District President</p>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-12">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="text-yellow-500" size={24} />
                  <span className="text-purple-700 font-bold text-sm">INSPIRING LEADERSHIP</span>
                </div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6 playfair">
                  Leading with Grace, Empowering with Purpose
                </h3>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    A fresh term blooms with a soul-stirring pooja at Jain Mandir, Chembur, marking the beginning of an extraordinary journey under the leadership of <span className="text-purple-700 font-semibold">WE Varsha Vora</span>.
                  </p>
                  <p>
                    As District President, she embodies the perfect blend of strength, charm, and diplomacy—qualities that inspire every member of our community to reach new heights.
                  </p>
                  <p className="font-semibold text-gray-800">
                    Fun-loving, fierce, and flawlessly focused on empowering every woman in our district.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Zap size={16} />
                    Strength
                  </span>
                  <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Sparkles size={16} />
                    Grace
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Target size={16} />
                    Vision
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 px-4 bg-linear-to-b from-transparent to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-pink-100 text-pink-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              UPCOMING
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Events & Initiatives
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us in making a difference in our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-purple-700 font-bold text-xs">{event.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-purple-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-pink-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 right-0 h-full animate-shimmer"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 playfair">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of empowered women creating positive change in communities across India
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Become a Member
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all duration-300">
                  View All Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">WE</span>
            </div>
            <div>
              <p className="font-bold text-lg">WE Clubs of India</p>
              <p className="text-sm text-gray-400">District 323 A2</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">Woman - Epitome of Service</p>
          <p className="text-sm text-gray-500">© 2025 WE - Woman Epitome of Service. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;