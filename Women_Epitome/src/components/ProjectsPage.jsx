/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Stethoscope, GraduationCap, Home, Users, ArrowRight, Calendar, MapPin, Target } from 'lucide-react';
import api from '../utils/api';

const ProjectsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [eventsByCategory, setEventsByCategory] = useState({});

  // Project category definitions with metadata
  const projectCategories = [
    {
      id: 1,
      title: "Anaaj Daan Relieve the Hunger",
      categoryKey: "anaajdaan",
      category: "Food & Nutrition",
      icon: Heart,
      description: "Donating food is considered as the highest form of giving.",
      link: "/projects/AnaajDaan",
      defaultImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
    },
    {
      id: 2,
      title: "Senior Citizen",
      categoryKey: "senior-citizen",
      category: "Senior Care",
      icon: Users,
      description: "We aim to improve their quality of life and ensure their well-being.",
      link: "/projects/SeniorCitizen",
      defaultImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
    },
    {
      id: 3,
      title: "Health",
      categoryKey: "health",
      category: "Healthcare",
      icon: Stethoscope,
      description: "Environment - Heal the Earth, Water Conservation, Solar Energy; Healthcare - Heal the Ailed; Cancer Care - Heal the Cancer patients.",
      link: "/projects/Health",
      defaultImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
    },
    {
      id: 4,
      title: "Education",
      categoryKey: "education",
      category: "Education",
      icon: GraduationCap,
      description: "It encompasses a broad range of assistance including adult education, awareness programs, skill development, vocational training and youth counseling.",
      link: "/projects/Education",
      defaultImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    },
    {
      id: 5,
      title: "Permanent Projects",
      categoryKey: "permanent-projects",
      category: "Infrastructure",
      icon: Home,
      description: "Building or repairing infrastructure such as water system, toilet blocks, classrooms and providing necessary soft goods like fans, lights, projector and others",
      link: "/projects/PermanentProjects",
      defaultImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
    },
    {
      id: 6,
      title: "Rural Development",
      categoryKey: "rural-development",
      category: "Rural Empowerment",
      icon: Users,
      description: "Aimed at improving the health, education, economic status, and promoting empowerment through vocational training and financial assistance.",
      link: "/projects/RuralDevelopment",
      defaultImage: "https://images.unsplash.com/photo-1516962126636-27ad087061cc?w=800&q=80"
    },
    {
      id: 7,
      title: "Animal Welfare",
      categoryKey: "animal-welfare",
      category: "Animal Care",
      icon: Heart,
      description: "It's about the quality of life an animal experiences and includes aspects like nutrition, housing, and freedom from pain, fear, and distress.",
      link: "/projects/AnimalWelfare",
      defaultImage: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80"
    },
    {
      id: 8,
      title: "Enable the Specially Abled",
      categoryKey: "specially-abled",
      category: "Empowerment",
      icon: Users,
      description: "Involves taking actions that support and empower individuals with disabilities to participate fully in society.",
      link: "/projects/SpeciallyAbled",
      defaultImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
    },
    {
      id: 9,
      title: "Help the Needy",
      categoryKey: "needy",
      category: "Community Support",
      icon: Heart,
      description: "Aims at providing financial aid, food, shelter, medical care, education, or other forms of support to help individuals or groups who are in a state of need or hardship, often due to poverty, lack of resources, or other difficulties.",
      link: "/projects/Needy",
      defaultImage: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
    },
    {
      id: 10,
      title: "Child Welfare",
      categoryKey: "child-welfare",
      category: "Child Care",
      icon: BookOpen,
      description: "Focuses on providing for children's physical needs, such as food, shelter, and healthcare. Ensuring children have access to opportunities for education, play, and positive social interactions, also includes transforming a girl child for the betterment of society.",
      link: "/projects/ChildWelfare",
      defaultImage: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80"
    },
    {
      id: 11,
      title: "Women Welfare",
      categoryKey: "women-welfare",
      category: "Women Empowerment",
      icon: Users,
      description: "Aimed at improving the health, education, economic status, and promoting empowerment through vocational training and financial assistance, also includes maternal and infant health.",
      link: "/projects/WomenWelfare",
      defaultImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
    },
    {
      id: 12,
      title: "Image Building",
      categoryKey: "image-building",
      category: "Public Relations",
      icon: Target,
      description: "Crafting and maintaining a positive public perception of our association.",
      link: "/projects/ImageBuilding",
      defaultImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
    }
  ];

  // Fetch events for all categories
  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch events for each category
        const eventsData = {};
        await Promise.all(
          projectCategories.map(async (project) => {
            try {
              const response = await api.get(`/clubs/events/${project.categoryKey}`);
              eventsData[project.categoryKey] = response.data.data.events || [];
            } catch (err) {
              console.error(`Error fetching events for ${project.categoryKey}:`, err);
              eventsData[project.categoryKey] = [];
            }
          })
        );

        setEventsByCategory(eventsData);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  // Create projects array with event counts and actual data
  const projects = projectCategories.map(project => {
    const events = eventsByCategory[project.categoryKey] || [];
    const eventCount = events.length;

    // Get the first event's image or use default
    const image = events.length > 0 && events[0].coverImage
      ? events[0].coverImage
      : project.defaultImage;

    return {
      ...project,
      image,
      events,
      stats: {
        beneficiaries: eventCount > 0 ? `${eventCount} Event${eventCount !== 1 ? 's' : ''}` : 'No Events',
        duration: "Ongoing",
        locations: events.length > 0 ? `${events.length} Club${events.length !== 1 ? 's' : ''}` : 'N/A'
      }
    };
  });

  const categories = [
    { name: "All Projects", count: projects.length, color: "purple" },
    { name: "Healthcare", count: 2, color: "pink" },
    { name: "Education", count: 2, color: "blue" },
    { name: "Empowerment", count: 3, color: "purple" },
    { name: "Community", count: 2, color: "yellow" },
    { name: "Infrastructure", count: 1, color: "orange" },
    { name: "Animal Care", count: 1, color: "green" }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading events...</p>
        </div>
      </div>
    );
  }

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

      {/* Error Message */}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg max-w-md">
          <p className="text-red-700 font-semibold">{error}</p>
        </div>
      )}

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
              <p className="text-3xl font-bold text-gray-800 mb-1">12</p>
              <p className="text-sm text-gray-600 font-semibold">Active Projects</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl text-center border border-purple-100">
              <Users className="w-8 h-8 text-pink-600 mb-3 mx-auto" />
              <p className="text-3xl font-bold text-gray-800 mb-1">48K+</p>
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
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${index === 0
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

                  <a href={project.link} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight size={16} />
                  </a>
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

export default ProjectsPage;

