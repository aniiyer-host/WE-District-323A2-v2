/* eslint-disable no-unused-vars */
import React from 'react';
import { Heart, BookOpen, Stethoscope, GraduationCap, Home, Users, ArrowRight, Calendar, MapPin, Target } from 'lucide-react';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Education for All",
      category: "Education",
      icon: BookOpen,
      description: "Providing quality education and learning resources to underprivileged children across our district.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      stats: { beneficiaries: "5000+", duration: "Ongoing", locations: "25+" }
    },
    {
      id: 2,
      title: "Health & Wellness Drive",
      category: "Healthcare",
      icon: Stethoscope,
      description: "Organizing health camps, awareness programs, and medical assistance for communities in need.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
      stats: { beneficiaries: "3000+", duration: "Ongoing", locations: "15+" }
    },
    {
      id: 3,
      title: "Women Empowerment Workshops",
      category: "Empowerment",
      icon: Users,
      description: "Skill development, leadership training, and entrepreneurship programs for women.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      stats: { beneficiaries: "2000+", duration: "Ongoing", locations: "20+" }
    },
    {
      id: 4,
      title: "Housing Initiative",
      category: "Community",
      icon: Home,
      description: "Building homes and providing shelter for families in need across our communities.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      stats: { beneficiaries: "500+", duration: "2023-2025", locations: "10+" }
    },
    {
      id: 5,
      title: "Scholarship Program",
      category: "Education",
      icon: GraduationCap,
      description: "Supporting meritorious students with scholarships to pursue higher education.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      stats: { beneficiaries: "1000+", duration: "Annual", locations: "All Districts" }
    },
    {
      id: 6,
      title: "Community Care",
      category: "Healthcare",
      icon: Heart,
      description: "Providing care packages, medical supplies, and support to elderly and vulnerable populations.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
      stats: { beneficiaries: "1500+", duration: "Ongoing", locations: "18+" }
    }
  ];

  const categories = [
    { name: "All Projects", count: projects.length, color: "purple" },
    { name: "Education", count: 2, color: "blue" },
    { name: "Healthcare", count: 2, color: "pink" },
    { name: "Empowerment", count: 1, color: "purple" },
    { name: "Community", count: 1, color: "yellow" }
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
            OUR WORK
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
              Projects &
            </span>
            <br />
            <span className="text-gray-800 playfair">Initiatives</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
            Transforming lives through impactful community projects
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center border border-purple-100">
              <Target className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
              <p className="text-3xl font-bold text-gray-800 mb-1">50+</p>
              <p className="text-sm text-gray-600 font-semibold">Active Projects</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center border border-purple-100">
              <Users className="w-8 h-8 text-pink-600 mb-3 mx-auto" />
              <p className="text-3xl font-bold text-gray-800 mb-1">13K+</p>
              <p className="text-sm text-gray-600 font-semibold">Lives Impacted</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center border border-purple-100">
              <MapPin className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
              <p className="text-3xl font-bold text-gray-800 mb-1">50+</p>
              <p className="text-sm text-gray-600 font-semibold">Locations</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center border border-purple-100">
              <Heart className="w-8 h-8 text-pink-600 mb-3 mx-auto" />
              <p className="text-3xl font-bold text-gray-800 mb-1">100%</p>
              <p className="text-sm text-gray-600 font-semibold">Dedication</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  index === 0
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-100'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-pink-100 text-pink-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              FEATURED PROJECTS
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Making a Difference
            </h2>
            <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-purple-700 font-bold text-xs">{project.category}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <project.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <project.icon className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors playfair">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="bg-purple-50 p-2 rounded-lg text-center">
                      <p className="font-bold text-purple-700">{project.stats.beneficiaries}</p>
                      <p className="text-gray-600">Beneficiaries</p>
                    </div>
                    <div className="bg-pink-50 p-2 rounded-lg text-center">
                      <p className="font-bold text-pink-700">{project.stats.duration}</p>
                      <p className="text-gray-600">Duration</p>
                    </div>
                    <div className="bg-purple-50 p-2 rounded-lg text-center">
                      <p className="font-bold text-purple-700">{project.stats.locations}</p>
                      <p className="text-gray-600">Locations</p>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-purple-100">
            <div className="text-center mb-12">
              <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
                OUR IMPACT
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 playfair">
                Transforming Communities Together
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every project we undertake is a step towards a better tomorrow. See how we're making a difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 playfair">Community First</h3>
                <p className="text-gray-600">Every initiative is designed with community needs at the heart of our mission.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 playfair">Measurable Impact</h3>
                <p className="text-gray-600">We track and measure our impact to ensure we're creating real, lasting change.</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 playfair">Collaborative Approach</h3>
                <p className="text-gray-600">Working together with partners, volunteers, and communities for maximum impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 playfair">
                Support Our Projects
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join us in making a lasting impact. Your support helps us reach more communities and transform more lives.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Donate Now
                  <Heart size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all duration-300">
                  Volunteer
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
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

export default ProjectsPage;

