import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ChevronDown, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import api from '../utils/api';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [clubs, setClubs] = useState([]);
    const [loadingClubs, setLoadingClubs] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [clubsError, setClubsError] = useState('');

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        clubId: '',
    });

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const res = await api.get('/clubs');
                // Handle all possible response shapes from the backend
                const data =
                    res.data?.data?.clubs ||   // { data: { clubs: [...] } }
                    res.data?.clubs ||          // { clubs: [...] }
                    (Array.isArray(res.data) ? res.data : []); // plain array
                setClubs(data);
                if (!data.length) {
                    setClubsError('No clubs found. Please contact admin.');
                }
            } catch (err) {
                console.error('Failed to load clubs:', err);
                setClubsError(
                    err.response?.data?.message ||
                    'Could not load clubs. Make sure the server is running.'
                );
            } finally {
                setLoadingClubs(false);
            }
        };
        fetchClubs();
    }, []);

    const handleChange = (e) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (form.password !== form.confirmPassword) {
            setErrorMsg('Passwords do not match.');
            return;
        }
        if (form.password.length < 6) {
            setErrorMsg('Password must be at least 6 characters.');
            return;
        }
        if (!form.clubId) {
            setErrorMsg('Please select your club.');
            return;
        }

        setSubmitting(true);
        try {
            await api.post('/auth/register', {
                email: form.email,
                username: form.username,
                password: form.password,
                clubId: form.clubId,
            });
            setSuccess(true);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const inputClass =
        'w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 text-sm';

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4">
                <div className="bg-white/95 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CheckCircle className="text-white" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">You're registered!</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Your account is <strong>pending admin approval</strong>. You'll be able to
                        log in once an admin reviews your request — usually within a day or two.
                    </p>
                    <Link
                        to="/login"
                        className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-center"
                    >
                        Go to Login
                    </Link>
                    <Link to="/" className="block mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/25 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg">
                            <UserPlus className="text-white" size={28} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-1">Register Your Club</h1>
                        <p className="text-gray-500 text-sm">Submit your details for admin approval</p>
                    </div>

                    {/* Error */}
                    {errorMsg && (
                        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                            <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
                            <p className="text-red-700 text-sm">{errorMsg}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="club@example.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                                <input
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. thane_angels"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Club */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Club</label>
                            <div className="relative">
                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={17} />
                                <select
                                    name="clubId"
                                    value={form.clubId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all appearance-none bg-white text-sm text-gray-700"
                                >
                                    <option value="">
                                        {loadingClubs ? 'Loading clubs…' : 'Select your club'}
                                    </option>
                                    {clubs.map(club => (
                                        <option key={club.club_id} value={club.club_id}>
                                            {club.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {clubsError && (
                                <p className="text-xs text-red-500 mt-1 ml-1">{clubsError}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Min. 6 characters"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Repeat your password"
                                    className={inputClass}
                                />
                            </div>
                            {/* Live mismatch hint */}
                            {form.confirmPassword && form.password !== form.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1 ml-1">Passwords don't match</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={submitting || loadingClubs}
                            className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Submitting…
                                </>
                            ) : (
                                <>
                                    <UserPlus size={18} />
                                    Submit Registration
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer links */}
                    <div className="mt-6 text-center space-y-1">
                        <p className="text-sm text-gray-500">
                            Already approved?{' '}
                            <Link to="/login" className="text-purple-600 font-semibold hover:underline">
                                Sign in
                            </Link>
                        </p>
                        <p className="text-xs text-gray-400">
                            After submitting, an admin will review and activate your account.
                        </p>
                    </div>
                </div>

                <p className="text-center mt-4 text-gray-500 text-sm">
                    Women Epitome District 323A2 © 2024
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;