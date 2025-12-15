/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Heart, Search } from 'lucide-react';
import { projectsData } from '../data/projectsData';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [enlargedImage, setEnlargedImage] = useState(null);

    // Helper to normalize and find project key
    const getProjectData = (id) => {
        // Handle varying cases or suffixes if necessary
        // e.g., "AnaajDaan.html" -> "anaajdaan"
        let key = id.toLowerCase().replace('.html', '');

        // Manual mapping for complex names if simple lowercase doesn't match
        const mapping = {
            "anaajdaan": "anaajdaan",
            "animalwelfare": "animal-welfare",
            "childwelfare": "child-welfare",
            "education": "education",
            "health": "health",
            "imagebuilding": "image-building",
            "needy": "needy",
            "permanentprojects": "permanent-projects",
            "ruraldevelopment": "rural-development",
            "seniorcitizen": "senior-citizen",
            "speciallyabled": "specially-abled",
            "womenwelfare": "women-welfare"
        };

        // Try direct key or mapped key
        return projectsData[key] || projectsData[mapping[key]] || projectsData[Object.keys(mapping).find(k => k.toLowerCase() === key)];
    };

    useEffect(() => {
        if (projectId) {
            const data = getProjectData(projectId);
            setProject(data);
        }
    }, [projectId]);

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600">Project not found or loading...</p>
                    <button
                        onClick={() => navigate('/projects')}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 relative overflow-hidden">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 py-6 relative z-20">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-2 text-purple-600 hover:text-pink-600 font-semibold transition-all hover:gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:shadow-lg"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Projects</span>
                </button>
            </div>

            {/* Hero Header */}
            <div className="relative">
                <div className="max-w-6xl mx-auto px-4 py-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient leading-tight">
                        {project.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-purple-600 mt-4">
                        <Sparkles className="animate-pulse" size={20} />
                        <p className="text-lg md:text-xl font-medium max-w-3xl">{project.subtitle}</p>
                        <Sparkles className="animate-pulse" size={20} />
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <section className="py-12 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {project.items && project.items.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {project.items.map((item, index) => (
                                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-purple-100 group">
                                    <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setEnlargedImage(item.imageUrl)}>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.description}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80'; // Fallback
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                            <span className="text-white text-sm font-medium flex items-center gap-2">
                                                <Search size={16} /> Click to enlarge
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <Link
                                                to={item.clubLink}
                                                className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold hover:bg-purple-200 transition-colors mb-3"
                                            >
                                                Performed by Club
                                            </Link>
                                            <p className="text-gray-700 leading-relaxed text-lg">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-purple-300">
                            <Heart className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-600 mb-2">Projects Coming Soon</h3>
                            <p className="text-gray-500">We are currently updating our database with recent activities for this category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Enlarged Preview */}
            {enlargedImage && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={() => setEnlargedImage(null)}
                >
                    <div className="relative max-w-5xl w-full">
                        <img
                            src={enlargedImage}
                            alt="Preview"
                            className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
                        />
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-purple-300 transition-colors p-2"
                            onClick={() => setEnlargedImage(null)}
                        >
                            <span className="text-xl font-bold">Close ✕</span>
                        </button>
                    </div>
                </div>
            )}
            {/* Footer */}
            <footer className="relative z-10 mt-20 bg-gray-900 text-white text-center py-8">
                <p className="text-sm font-medium">© 2025 WE Club - District 323 A2 | All rights reserved.</p>
            </footer>

            <style>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ProjectDetail;
