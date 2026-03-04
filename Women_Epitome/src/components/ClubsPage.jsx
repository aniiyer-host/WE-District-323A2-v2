/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar, Award, ArrowRight, Heart, ChevronDown, ChevronUp, X, ImageIcon } from 'lucide-react';
import api from '../utils/api';

const MAX_EVENT_IMAGES = 3;

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Track which event card is expanded: `${clubId}-${eventIndex}`
  const [expandedEvent, setExpandedEvent] = useState(null);
  // Lightbox
  const [lightbox, setLightbox] = useState(null); // { images, index }

  // Lightbox keyboard navigation (must run on every render before any return)
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const lightboxPrev = useCallback(
    () => setLightbox(l =>
      l ? { ...l, index: (l.index - 1 + l.images.length) % l.images.length } : null
    ),
    []
  );
  const lightboxNext = useCallback(
    () => setLightbox(l =>
      l ? { ...l, index: (l.index + 1) % l.images.length } : null
    ),
    []
  );

  // Fetch clubs from API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        // Try to fetch from API (will work if user is logged in)
        const response = await api.get('/clubs');

        // Map API data to match the format expected by the UI
        const clubsData = response.data.data.clubs.map(club => ({
          id: club._id,
          name: club.name,
          slug: club.clubId,
          location: club.description.split('in ').pop() || 'Mumbai Region',
          established: club.established ? new Date(club.established).getFullYear().toString() : '2017',
          members: club.members?.length.toString() || '0',
          president: club.president?.name || 'To be updated',
          focus: club.description.split('focused on ')[1]?.split('.')[0] || club.description.split('Focus on ')[1]?.split('.')[0] || 'Community Service',
          image: club.coverImage || club.images?.[0] || `https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80`,
          achievements: club.description.split(',').slice(0, 3) || ['Community Service'],
          // Pass events through so we can show images
          events: (club.events || []).map(ev => ({
            title: ev.title || 'Event',
            date: ev.date ? new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
            location: ev.location || '',
            coverImage: ev.coverImage || '',
            // Hard-cap at MAX_EVENT_IMAGES
            images: (ev.images || []).filter(Boolean).slice(0, MAX_EVENT_IMAGES)
          })).filter(ev => ev.coverImage || ev.images.length > 0)
        }));

        setClubs(clubsData);
      } catch (error) {
        console.log('API not accessible, using fallback data');
        // Fallback: If API fails (user not logged in), use static data
        setClubs(getFallbackClubs());
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  // Fallback static data (same as before)
  const getFallbackClubs = () => [
    {
      id: 1,
      name: "WE Club of Anushakti Royals",
      slug: "anushakti-royals",
      location: "Anushaktinagar, Mumbai",
      established: "2017",
      members: "6",
      president: "WE Devki Goklani",
      focus: "Community Service",
      image: "/images/club-pages-imgs/AnushaktiRoyals/1.png",
      achievements: ["Health Check-up Camps", "Cancer Care Support", "Women Empowerment"]
    },
    {
      id: 2,
      name: "WE Club of Belapur",
      slug: "belapur",
      location: "Belapur, Navi Mumbai",
      established: "2022",
      members: "17",
      president: "WE Geeta Singh",
      focus: "Animal Welfare & Care for Elderly",
      image: "/images/club-pages-imgs/Belapur/1.jpg",
      achievements: ["Community Outreach", "Educational Support", "Health Initiatives"]
    },
    {
      id: 3,
      name: "WE Club of Chembur",
      slug: "chembur",
      location: "Chembur, Mumbai",
      established: "2017",
      members: "29",
      president: "WE Ramolla Karnani",
      focus: "Education & Child Welfare",
      image: "/images/club-pages-imgs/Chembur/1.jpg",
      achievements: ["5000+ lives impacted", "Solar power initiatives"]
    },
    {
      id: 4,
      name: "WE Club of Chembur Galaxy",
      slug: "chembur-galaxy",
      location: "Chembur, Mumbai",
      established: "2017",
      members: "18",
      president: "WE Kiran Sahetia",
      focus: "Women Empowerment",
      image: "/images/club-pages-imgs/ChemburGalaxy/1.jpg",
      achievements: ["Skill Building", "Social Welfare"]
    },
    {
      id: 5,
      name: "WE Club of Dronagiri",
      slug: "dronagiri",
      location: "Dronagiri, Navi Mumbai",
      established: "2023",
      members: "19",
      president: "WE Surekha Bhoir",
      focus: "Health & Wellness",
      image: "/images/club-pages-imgs/Dronagiri/1.jpg",
      achievements: ["Health Camps", "Community Service", "Women Support"]
    },
    {
      id: 6,
      name: "WE Club of Girls in Pearls",
      slug: "girls-in-pearls",
      location: "Mumbai Region",
      established: "2022",
      members: "28",
      president: "WE Neha Shende",
      focus: "Youth Development & Environment",
      image: "/images/club-pages-imgs/GirlsinPearls/1.jpg",
      achievements: ["Youth Programs", "Leadership Training", "Community Projects"]
    },
    {
      id: 7,
      name: "WE Club of New Panvel Steel Town",
      slug: "new-panvel-steel-town",
      location: "New Panvel, Navi Mumbai",
      established: "2017",
      members: "38",
      president: "WE Megha Jain",
      focus: "Community Development",
      image: "/images/club-pages-imgs/NPST/1.jpg",
      achievements: ["Social Initiatives", "Community Welfare", "Educational Support"]
    },
    {
      id: 8,
      name: "WE Club of Shining Star",
      slug: "shining-star",
      location: "Vashi, Navi Mumbai",
      established: "2024",
      members: "12",
      president: "WE Dr. Vijaya Gosavi",
      focus: "Environment & Care for Elderly",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      achievements: ["Environment Programs", "Community Service"]
    },
    {
      id: 9,
      name: "WE Club of Thane Angels",
      slug: "thane-angels",
      location: "Thane, Maharashtra",
      established: "2019",
      members: "38",
      president: "WE Priyadarshini Sane",
      focus: "Community Development",
      image: "/images/club-pages-imgs/Angels/1.jpg",
      achievements: ["4000+ lives touched", "30+ projects", "Excellence award winner"]
    },
    {
      id: 10,
      name: "WE Club of Thane Lake City",
      slug: "thane-lake-city",
      location: "Thane, Maharashtra",
      established: "2017",
      members: "32",
      president: "WE Sarala Bhot",
      focus: "Health & Education",
      image: "/images/club-pages-imgs/LakeCity/1.jpg",
      achievements: ["Rural Developments", "Educational Programs", "Social Welfare"]
    },
    {
      id: 11,
      name: "WE Club of Thane Stars City",
      slug: "thane-stars-city",
      location: "Thane, Maharashtra",
      established: "2024",
      members: "12",
      president: "WE Rohini Thakur",
      focus: "Education & Literacy",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
      achievements: ["Literacy Programs", "Education Support", "Community Projects"]
    },
    {
      id: 12,
      name: "WE Club of Uran",
      slug: "uran",
      location: "Uran, Navi Mumbai",
      established: "2017",
      members: "22",
      president: "WE Shilpa Gade",
      focus: "Rural Development & Health",
      image: "/images/club-pages-imgs/Uran/1.jpg",
      achievements: ["Rural Outreach", "Community Service", "Women Empowerment"]
    },
    {
      id: 13,
      name: "WE Club of Vasant Vihar",
      slug: "vasant-vihar",
      location: "Vasant Vihar, Mumbai",
      established: "2017",
      members: "59",
      president: "WE Hiral Sanghvi",
      focus: "Education & Child Welfare",
      image: "/images/club-pages-imgs/VasantVihar/1.jpg",
      achievements: ["Educative Initiatives", "1000+ lives touched"]
    },
    {
      id: 14,
      name: "WE Club of Vashi Navi Mumbai",
      slug: "vashi-navi-mumbai",
      location: "Vashi, Navi Mumbai",
      established: "2017",
      members: "35",
      president: "WE Namita Sinha",
      focus: "Community Welfare",
      image: "/images/club-pages-imgs/VashiNaviMumbai/1.jpg",
      achievements: ["Rural Development", "Care for Elderly"]
    },
    {
      id: 15,
      name: "WE Club of Vile Parle",
      slug: "vile-parle",
      location: "Vile Parle, Mumbai",
      established: "2018",
      members: "32",
      president: "WE Neena Pethe",
      focus: "Education & Literacy",
      image: "/images/club-pages-imgs/VileParle/1.jpg",
      achievements: ["500+ students helped", "5+ schools supported", "Education champion"]
    }
    // Fallback clubs don't have events from DB, so empty array
  ].map(c => ({ ...c, events: [] }));

  const districtInfo = {
    name: "District 323 A2",
    totalClubs: clubs.length,
    totalMembers: clubs.reduce((sum, club) => sum + parseInt(club.members || '0'), 0),
    established: "2017",
    area: "Mumbai, Navi Mumbai & Thane Region"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading clubs...</p>
        </div>
      </div>
    );
  }

  const toggleEvent = (key) => setExpandedEvent(prev => prev === key ? null : key);

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-pink-100">
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
            <span className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">
              The Clubs
            </span>
            <br />
            <span className="text-gray-800 playfair">of District 323 A2</span>
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
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{districtInfo.totalClubs}</p>
                <p className="text-sm text-gray-600 font-semibold">Active Clubs</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{districtInfo.totalMembers}+</p>
                <p className="text-sm text-gray-600 font-semibold">Total Members</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{districtInfo.established}</p>
                <p className="text-sm text-gray-600 font-semibold">Established</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
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
            <div className="h-2 w-24 bg-linear-to-r from-purple-600 to-pink-600 rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clubs.map((club) => (
              <div key={club.id} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
                {/* Cover image */}
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={club.image}
                    alt={club.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-purple-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-purple-700 font-bold text-xs">Est. {club.established}</span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
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

                  {/* ── Events accordion ── */}
                  {club.events && club.events.length > 0 && (
                    <div className="mb-4 border border-purple-100 rounded-xl overflow-hidden">
                      <p className="text-xs font-bold text-purple-700 uppercase tracking-wide px-3 pt-3 pb-2 bg-purple-50">
                        Latest Event
                      </p>
                      <div className="divide-y divide-purple-50">
                        {[...club.events]
                          .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
                          .slice(0, 1)
                          .map((ev, evIdx) => {
                            const key = `${club.id}-${evIdx}`;
                            const isOpen = expandedEvent === key;
                            const allImages = [
                              ev.coverImage,
                              ...(ev.images || []).filter(img => img !== ev.coverImage)
                            ].filter(Boolean).slice(0, MAX_EVENT_IMAGES);

                            return (
                              <div key={evIdx} className="bg-white">
                                {/* Event row — click to expand */}
                                <button
                                  type="button"
                                  onClick={() => toggleEvent(key)}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-purple-50 transition-colors"
                                >
                                  {/* Thumbnail */}
                                  {ev.coverImage ? (
                                    <img
                                      src={ev.coverImage}
                                      alt={ev.title}
                                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-purple-100"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                                      <ImageIcon size={16} className="text-purple-400" />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-800 truncate">{ev.title}</p>
                                    {ev.date && <p className="text-xs text-gray-500">{ev.date}</p>}
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-shrink-0">
                                    {allImages.length > 0 && (
                                      <span className="text-xs text-purple-500 font-medium">{allImages.length} 📷</span>
                                    )}
                                    {isOpen
                                      ? <ChevronUp size={14} className="text-purple-500" />
                                      : <ChevronDown size={14} className="text-gray-400" />}
                                  </div>
                                </button>

                                {/* Expanded image grid */}
                                {isOpen && (
                                  <div className="px-3 pb-3">
                                    {ev.location && (
                                      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                                        <MapPin size={11} /> {ev.location}
                                      </p>
                                    )}
                                    {allImages.length > 0 ? (
                                      <div className={`grid gap-1.5 ${allImages.length === 1 ? 'grid-cols-1' :
                                        allImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                                        }`}>
                                        {allImages.map((img, imgIdx) => (
                                          <button
                                            key={imgIdx}
                                            type="button"
                                            onClick={() => setLightbox({ images: allImages, index: imgIdx })}
                                            className="relative aspect-square rounded-lg overflow-hidden border border-purple-100 hover:border-purple-400 hover:shadow-md transition-all group/img"
                                          >
                                            <img
                                              src={img}
                                              alt={`${ev.title} image ${imgIdx + 1}`}
                                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                                              <span className="opacity-0 group-hover/img:opacity-100 text-white text-xs font-bold transition-opacity">View</span>
                                            </div>
                                          </button>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-xs text-gray-400 italic">No images for this event yet.</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* Spacer to push button to bottom */}
                  <div className="flex-1" />

                  <Link
                    to={`/clubs/${club.slug}`}
                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ── Lightbox ── */}
          {lightbox && (
            <div
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <div className="relative max-w-4xl max-h-[80vh] w-full" onClick={e => e.stopPropagation()}>
                <img
                  src={lightbox.images[lightbox.index]}
                  alt={`Image ${lightbox.index + 1}`}
                  className="w-full h-full object-contain rounded-2xl"
                  style={{ maxHeight: '80vh' }}
                />

                {/* Counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                  {lightbox.index + 1} / {lightbox.images.length}
                </div>

                {/* Prev / Next arrows (only if more than 1 image) */}
                {lightbox.images.length > 1 && (
                  <>
                    <button
                      onClick={lightboxPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors text-lg font-bold"
                    >
                      ‹
                    </button>
                    <button
                      onClick={lightboxNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors text-lg font-bold"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails strip */}
              {lightbox.images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" onClick={e => e.stopPropagation()}>
                  {lightbox.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(l => ({ ...l, index: i }))}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === lightbox.index ? 'border-white scale-110' : 'border-white/30 opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img src={img} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
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

export default ClubsPage;

