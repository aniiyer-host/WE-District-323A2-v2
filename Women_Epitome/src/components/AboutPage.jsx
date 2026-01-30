/* eslint-disable no-unused-vars */
import React from 'react';
import { Heart, Users, Award, Sparkles, Target, HandHeart, Globe, Lightbulb, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We lead with empathy and care for every individual in our community."
    },
    {
      icon: Target,
      title: "Purpose",
      description: "Every action is driven by our mission to empower and transform lives."
    },
    {
      icon: HandHeart,
      title: "Service",
      description: "Dedicated to making a meaningful difference in communities across India."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing creative solutions to address complex social challenges."
    }
  ];

  const milestones = [
    {
      year: "2000",
      title: "Foundation",
      description: "WE Clubs of India was established with a vision to empower women and serve communities."
    },
    {
      year: "2010",
      title: "Expansion",
      description: "Grew to 50+ clubs across multiple districts, expanding our reach and impact."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Adapted to virtual platforms, continuing our mission during challenging times."
    },
    {
      year: "2025",
      title: "New Horizons",
      description: "Under new leadership, we're reaching new heights of service and empowerment."
    }
  ];

  const team = [
    {
      name: "WE Varsha Vora",
      role: "District President",
      image: "../images/index-page-imgs/pfp.jpg"
    },
    {
      name: "Leadership Team",
      role: "District Board",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80"
    },
    {
      name: "Club Presidents",
      role: "Local Leaders",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
    }
  ];

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
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-6">
            OUR STORY
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
              About
            </span>
            <br />
            <span className="text-black-800 playfair">Woman Epitome of Service</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
            Empowering women, transforming communities, one act of service at a time
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-pink-100 text-pink-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
                OUR MISSION
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 playfair">
                Empowering Women, Serving Communities
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  WE (Woman Epitome of Service) Clubs of India is a dynamic network of women dedicated to creating positive change in our communities. We believe that empowered women are the cornerstone of a thriving society.
                </p>
                <p>
                  Through our diverse initiatives, we focus on education, healthcare, women empowerment, and community development, touching thousands of lives across District 323 A2 and beyond.
                </p>
                <p className="font-semibold text-purple-700">
                  Together, we are stronger. Together, we make a difference.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-4 border-white/30">
                  <Globe className="w-20 h-20 text-white mb-6 mx-auto" />
                  <h3 className="text-3xl font-bold text-white mb-4 text-center playfair">Our Vision</h3>
                  <p className="text-white/90 text-center text-lg leading-relaxed">
                    To be the leading force in women empowerment and community service, creating a ripple effect of positive change that transforms lives and builds stronger, more inclusive communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              OUR VALUES
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              What We Stand For
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 text-center">
                <value.icon className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3 playfair">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-pink-100 text-pink-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              OUR JOURNEY
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Milestones & Achievements
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-pink-600 hidden md:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="w-full md:w-5/12">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{milestone.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 playfair">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              LEADERSHIP
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guided by visionary leaders committed to our mission
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 playfair">{member.name}</h3>
                  <p className="text-purple-600 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <img src="/images/WE-emblem.png" />
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

export default AboutPage;

