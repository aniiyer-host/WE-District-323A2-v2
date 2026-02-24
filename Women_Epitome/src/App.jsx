import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navigation from './components/Navigation.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// ── Eagerly loaded (always needed on first paint) ───────────────────────────
import LandingPage from './components/LandingPage.jsx'

// ── Lazy loaded pages (split into separate chunks) ──────────────────────────
const AboutPage = lazy(() => import('./components/AboutPage.jsx'))
const ProjectsPage = lazy(() => import('./components/ProjectsPage.jsx'))
const ProjectDetail = lazy(() => import('./components/ProjectDetail.jsx'))
const ClubsPage = lazy(() => import('./components/ClubsPage.jsx'))
const ContactPage = lazy(() => import('./components/ContactPage.jsx'))
const LoginPage = lazy(() => import('./components/LoginPage.jsx'))
const MembershipFormPage = lazy(() => import('./components/MembershipFormPage.jsx'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard.jsx'))
const ClubDashboard = lazy(() => import('./components/ClubDashboard.jsx'))
const ClubEditForm = lazy(() => import('./components/ClubEditForm.jsx'))
const ClubCreateForm = lazy(() => import('./components/ClubCreateForm.jsx'))

// ── Club pages (each is its own chunk, only loaded when visited) ─────────────
const AnushaktiRoyals = lazy(() => import('./components/clubs/AnushaktiRoyals.jsx'))
const Belapur = lazy(() => import('./components/clubs/Belapur.jsx'))
const Chembur = lazy(() => import('./components/clubs/Chembur.jsx'))
const ChemburGalaxy = lazy(() => import('./components/clubs/ChemburGalaxy.jsx'))
const Dronagiri = lazy(() => import('./components/clubs/Dronagiri.jsx'))
const GirlsInPearls = lazy(() => import('./components/clubs/GirlsInPearls.jsx'))
const NewPanvelSteelTown = lazy(() => import('./components/clubs/NewPanvelSteelTown.jsx'))
const ShiningStar = lazy(() => import('./components/clubs/ShiningStar.jsx'))
const ThaneAngels = lazy(() => import('./components/clubs/ThaneAngels.jsx'))
const ThaneLakeCity = lazy(() => import('./components/clubs/ThaneLakeCity.jsx'))
const ThaneStarsCity = lazy(() => import('./components/clubs/ThaneStarsCity.jsx'))
const Uran = lazy(() => import('./components/clubs/Uran.jsx'))
const VasantVihar = lazy(() => import('./components/clubs/VasantVihar.jsx'))
const VashiNaviMumbai = lazy(() => import('./components/clubs/VashiNaviMumbai.jsx'))
const VileParle = lazy(() => import('./components/clubs/VileParle.jsx'))

// ── Shared page-level loading fallback ──────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-lg text-purple-700 font-semibold">Loading…</p>
    </div>
  </div>
)

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <ScrollToTop />
          <Navigation />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/clubs" element={<ClubsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/membership" element={<MembershipFormPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Dashboard Routes */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute requireRole="admin"><AdminDashboard /></ProtectedRoute>
              } />
              <Route path="/club-dashboard" element={
                <ProtectedRoute requireRole="club"><ClubDashboard /></ProtectedRoute>
              } />

              {/* Club Edit/Create Routes */}
              <Route path="/admin-dashboard/create-club" element={
                <ProtectedRoute requireRole="admin"><ClubCreateForm /></ProtectedRoute>
              } />
              <Route path="/admin-dashboard/edit-club/:clubId" element={
                <ProtectedRoute requireRole="admin"><ClubEditForm /></ProtectedRoute>
              } />
              <Route path="/club-dashboard/edit/:clubId" element={
                <ProtectedRoute requireRole="club"><ClubEditForm /></ProtectedRoute>
              } />

              {/* Club Routes */}
              <Route path="/clubs/anushakti-royals" element={<AnushaktiRoyals />} />
              <Route path="/clubs/belapur" element={<Belapur />} />
              <Route path="/clubs/chembur" element={<Chembur />} />
              <Route path="/clubs/chembur-galaxy" element={<ChemburGalaxy />} />
              <Route path="/clubs/dronagiri" element={<Dronagiri />} />
              <Route path="/clubs/girls-in-pearls" element={<GirlsInPearls />} />
              <Route path="/clubs/new-panvel-steel-town" element={<NewPanvelSteelTown />} />
              <Route path="/clubs/shining-star" element={<ShiningStar />} />
              <Route path="/clubs/thane-angels" element={<ThaneAngels />} />
              <Route path="/clubs/thane-lake-city" element={<ThaneLakeCity />} />
              <Route path="/clubs/thane-stars-city" element={<ThaneStarsCity />} />
              <Route path="/clubs/uran" element={<Uran />} />
              <Route path="/clubs/vasant-vihar" element={<VasantVihar />} />
              <Route path="/clubs/vashi-navi-mumbai" element={<VashiNaviMumbai />} />
              <Route path="/clubs/vile-parle" element={<VileParle />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App