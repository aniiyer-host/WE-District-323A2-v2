/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Footer from './Footer';
import ClubEventsSection from './ClubEventsSection';
import api from '../utils/api';

const GenericClubPage = () => {
  const { clubSlug } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await api.get(`/clubs/${clubSlug}`);
        const clubData = response.data.data.club;

        setClub(clubData);
      } catch (err) {
        console.error('Failed to fetch club:', err);
        setError('Club not found or unable to load club data.');
      } finally {
        setLoading(false);
      }
    };

    if (clubSlug) {
      fetchClub();
    }
  }, [clubSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-purple-700 font-semibold">
            Loading club...
          </p>
        </div>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <button
            onClick={() => navigate('/clubs')}
            className="mx-auto flex items-center justify-center"
            aria-label="Back to clubs"
          >
            <ArrowLeft className="w-8 h-8 text-purple-600 hover:text-pink-600" />
          </button>

          <h2 className="text-3xl font-bold text-gray-800">
            Club Not Found
          </h2>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            The club you're looking for doesn't exist or could not be loaded.
          </p>

          <button
            onClick={() => navigate('/clubs')}
            className="inline-flex mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 items-center justify-center gap-2"
          >
            Back to Clubs Directory
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Date TBA';

    const dt = new Date(dateString);

    if (Number.isNaN(dt.getTime())) {
      return 'Date TBA';
    }

    return dt.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const establishedYear = club.established
    ? new Date(club.established).getFullYear().toString()
    : '2017';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
        <button
          onClick={() => navigate('/clubs')}
          className="flex items-center gap-2 text-purple-600 hover:text-pink-600 font-semibold transition-all hover:gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          <ArrowLeft size={20} />
          <span>Back to Clubs</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="inline-block mb-6 p-6 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <img
              src="/images/WE-emblem.png"
              alt="Club Logo"
              className="w-24 h-auto mx-auto"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-linear">
            {club.name}
          </h1>

          <div className="flex items-center justify-center gap-2 text-purple-600">
            <Sparkles className="animate-pulse" size={20} />

            <p className="text-xl font-medium">
              Empowering Communities Through Service & Unity
            </p>

            <Sparkles className="animate-pulse" size={20} />
          </div>
        </div>
      </div>

      {/* Club Info Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-100 hover:shadow-purple-200/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />

              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                About the Club
              </h2>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {club.name}
                </h3>

                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />

                    <span className="font-semibold">
                      Year of inception:
                    </span>

                    {establishedYear}
                  </p>

                  {club.president && (
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full" />

                      <span className="font-semibold">
                        President:
                      </span>

                      {typeof club.president === 'string'
                        ? club.president
                        : club.president.name || 'To be updated'}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {club.description && (
                <div className="bg-white rounded-2xl p-6 border-l-4 border-purple-500 shadow-sm">
                  <p className="font-semibold text-purple-900 mb-4">
                    <span className="text-purple-600">About Us:</span>
                  </p>

                  <p className="mb-4 leading-relaxed text-gray-700">
                    {club.description}
                  </p>
                </div>
              )}

              {/* Events Section */}
              <ClubEventsSection
                clubId={club.club_id}
                clubLabel={club.name}
              />

              {/* Gallery Section */}
              {(club.images && club.images.length > 0) ||
              club.cover_image ||
              club.logo ? (
                <section className="py-12 px-4 relative z-10 club-gallery">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                        Gallery
                      </h2>

                      <p className="text-purple-600">
                        Moments that matter
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Gallery Images */}
                      {(club.images || []).map((img, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={img}
                            alt={`${club.name} gallery ${index + 1}`}
                            loading="lazy"
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      ))}

                      {/* Cover Image */}
                      {club.cover_image && (
                        <div
                          key="cover"
                          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={club.cover_image}
                            alt={`${club.name} cover image`}
                            loading="lazy"
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}

                      {/* Logo */}
                      {club.logo && (
                        <div
                          key="logo"
                          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                        >
                          <img
                            src={club.logo}
                            alt={`${club.name} logo`}
                            loading="lazy"
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes linear {
          0%, 100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        .animate-linear {
          background-size: 200% 200%;
          animation: linear 3s ease infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GenericClubPage;