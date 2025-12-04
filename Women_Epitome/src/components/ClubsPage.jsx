/* eslint-disable no-unused-vars */
import React from 'react';
import { Users, MapPin, Calendar, Award, Mail, Phone, ArrowRight, Star, Heart } from 'lucide-react';

const ClubsPage = () => {
  const clubs = [
    {
      id: 1,
      name: "WE Chembur",
      location: "Chembur, Mumbai",
      established: "2005",
      members: "45",
      president: "WE Priya Sharma",
      focus: "Education & Healthcare",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
      achievements: ["5000+ lives impacted", "15+ active projects", "Award-winning initiatives"]
    },
    {
      id: 2,
      name: "WE Powai",
      location: "Powai, Mumbai",
      established: "2010",
      members: "38",
      president: "WE Anjali Mehta",
      focus: "Women Empowerment",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      achievements: ["3000+ beneficiaries", "12+ workshops conducted", "Community leader"]
    },
    {
      id: 3,
      name: "WE Thane",
      location: "Thane, Maharashtra",
      established: "2008",
      members: "42",
      president: "WE Kavita Desai",
      focus: "Community Development",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
      achievements: ["4000+ lives touched", "20+ projects", "Excellence award winner"]
    },
    {
      id: 4,
      name: "WE Navi Mumbai",
      location: "Navi Mumbai",
      established: "2012",
      members: "35",
      president: "WE Sneha Patel",
      focus: "Youth Development",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
      achievements: ["2500+ youth trained", "10+ skill programs", "Innovation hub"]
    },
    {
      id: 5,
      name: "WE Kalyan",
      location: "Kalyan, Maharashtra",
      established: "2015",
      members: "30",
      president: "WE Meera Joshi",
      focus: "Health & Wellness",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
      achievements: ["2000+ health camps", "8+ medical initiatives", "Community health leader"]
    },
    {
      id: 6,
      name: "WE Kurla",
      location: "Kurla, Mumbai",
      established: "2007",
      members: "40",
      president: "WE Radha Iyer",
      focus: "Education & Literacy",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
      achievements: ["6000+ students helped", "25+ schools supported", "Education champion"]
    }
  ];

  const districtInfo = {
    name: "District 323 A2",
    totalClubs: clubs.length,
    totalMembers: clubs.reduce((sum, club) => sum + parseInt(club.members), 0),
    established: "2000",
    area: "Mumbai & Thane Region"
  };

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
            OUR NETWORK
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
              Our Clubs
            </span>
            <br />
            <span className="text-gray-800 playfair">District 323 A2</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto font-light">
            A network of empowered women making a difference across communities
          </p>
        </div>
      </section>

      {/* District Stats */}
      <section className="py-16 px-4 -mt-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{districtInfo.totalClubs}</p>
                <p className="text-sm text-gray-600 font-semibold">Active Clubs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{districtInfo.totalMembers}+</p>
                <p className="text-sm text-gray-600 font-semibold">Total Members</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{districtInfo.established}</p>
                <p className="text-sm text-gray-600 font-semibold">Established</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-bold text-gray-800 mb-1">{districtInfo.area}</p>
                <p className="text-sm text-gray-600 font-semibold">Coverage Area</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-pink-100 text-pink-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
              ALL CLUBS
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-gray-800 mb-4 playfair">
              Meet Our Clubs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each club brings unique strengths and focuses to our collective mission
            </p>
            <div className="h-2 w-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <div key={club.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-purple-700 font-bold text-xs">Est. {club.established}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors playfair">
                        {club.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-purple-600" />
                        <span>{club.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-purple-700 font-semibold mb-1">President</p>
                    <p className="text-gray-800 font-medium">{club.president}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-purple-700 font-semibold mb-1">Focus Area</p>
                    <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {club.focus}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-purple-600" />
                        <span>{club.members} Members</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {club.achievements.slice(0, 2).map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                          <Award size={12} className="text-pink-600" />
                          <span>{achievement}</span>
                        </div>
                      ))}
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

      {/* Join a Club Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-purple-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-4">
                  JOIN US
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 playfair">
                  Become Part of Our Family
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Each club offers unique opportunities to make a difference. Whether you're interested in education, healthcare, empowerment, or community development, there's a place for you.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-700 font-semibold">Connect with like-minded women</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-700 font-semibold">Make a meaningful impact</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-700 font-semibold">Develop leadership skills</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Find Your Club
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-4 border-white/30">
                    <h3 className="text-2xl font-bold text-white mb-4 text-center playfair">Club Benefits</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-300 mt-1" />
                        <p className="text-white/90">Networking opportunities</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-300 mt-1" />
                        <p className="text-white/90">Skill development workshops</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-300 mt-1" />
                        <p className="text-white/90">Community service projects</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-300 mt-1" />
                        <p className="text-white/90">Leadership training programs</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-yellow-300 mt-1" />
                        <p className="text-white/90">Recognition and awards</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                Ready to Join?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Connect with a club near you and start your journey of service and empowerment
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Contact Us
                  <Mail size={20} />
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-all duration-300 flex items-center gap-2">
                  <Phone size={20} />
                  Call Now
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

export default ClubsPage;

