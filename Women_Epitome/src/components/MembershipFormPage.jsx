import { useState, useEffect } from 'react';
import { Heart, Sparkles, Mail, Phone, User, ChevronDown, CheckCircle, MessageSquare, Send } from 'lucide-react';
import api from '../utils/api';
import Footer from './Footer';
import { useToast } from './Toast';

const MembershipFormPage = () => {
    const toast = useToast();
    const [clubs, setClubs] = useState([]);
    const [loadingClubs, setLoadingClubs] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        name: '', email: '', phone: '', clubId: '', message: '',
    });

    useEffect(() => {
        api.get('/clubs')
            .then(res => setClubs(res.data.data?.clubs || res.data || []))
            .catch(() => setClubs([]))
            .finally(() => setLoadingClubs(false));
    }, []);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.clubId) { toast.error('Please select a club.'); return; }

        setSubmitting(true);
        try {
            const selectedClub = clubs.find(c => c.club_id === form.clubId);
            await api.post('/email/membership', {
                name:     form.name,
                email:    form.email,
                phone:    form.phone,
                clubName: selectedClub?.name || form.clubId,
                message:  form.message,
            });
            setSubmitted(true);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to send enquiry. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4">
                <div className="bg-white/95 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CheckCircle className="text-white" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Enquiry Sent!</h2>
                    <p className="text-gray-600 mb-2 leading-relaxed">
                        Thank you, <strong>{form.name}</strong>! We've received your membership enquiry.
                        Our team will review it and get back to you at <strong>{form.email}</strong> shortly.
                    </p>
                    <p className="text-gray-500 text-sm mb-8">A confirmation email has been sent to your inbox.</p>
                    <a href="/" className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-center">
                        Back to Home
                    </a>
                </div>
            </div>
        );
    }

    const inputClass = "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white";

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Playfair+Display:wght@400;700;900&display=swap');
                * { font-family: 'Poppins', sans-serif; }
                .playfair { font-family: 'Playfair Display', serif; }
            `}</style>

            {/* Hero */}
            <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden pt-24 px-4">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto text-center">
                    <span className="inline-block bg-purple-100 text-purple-700 px-6 py-2 rounded-full font-bold text-sm mb-6">JOIN OUR COMMUNITY</span>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent playfair">Become a</span>
                        <br /><span className="text-gray-800 playfair">Member</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
                        Interested in joining a WE Club? Fill in your details and we'll be in touch.
                    </p>
                </div>
            </section>

            {/* Info Cards + Form */}
            <section className="py-10 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { icon: Heart,       title: 'Make an Impact',  desc: 'Join community projects that transform lives across Mumbai' },
                            { icon: Sparkles,    title: 'Lead the Change', desc: 'Develop leadership skills through meaningful service' },
                            { icon: CheckCircle, title: 'Easy Process',    desc: 'Fill the form and our team will personally reach out to you' },
                        ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-purple-100 text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2 playfair">{title}</h3>
                                <p className="text-gray-600 text-sm">{desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Form card */}
                    <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden max-w-2xl mx-auto">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-white text-center">
                            <h2 className="text-2xl font-black playfair">Membership Enquiry</h2>
                            <p className="text-white/80 text-sm mt-1">We manually review every request and get in touch personally</p>
                        </div>

                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={18} />
                                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 98765 43210" className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Club You're Interested In *</label>
                                    <div className="relative">
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                        <select name="clubId" value={form.clubId} onChange={handleChange} required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none bg-white">
                                            <option value="">{loadingClubs ? 'Loading clubs…' : 'Select a club'}</option>
                                            {clubs.map(club => (
                                                <option key={club.club_id} value={club.club_id}>{club.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-3.5 text-purple-400" size={18} />
                                        <textarea name="message" value={form.message} onChange={handleChange} rows={4}
                                            placeholder="Tell us a little about yourself or why you'd like to join…"
                                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none bg-white" />
                                    </div>
                                </div>

                                <button type="submit" disabled={submitting || loadingClubs}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2">
                                    {submitting
                                        ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending…</>
                                        : <><Send size={18} /> Send Membership Enquiry</>
                                    }
                                </button>
                            </form>

                            <p className="text-center text-xs text-gray-400 mt-5">
                                Our team personally reviews every enquiry and will reach out within a few days.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default MembershipFormPage;