import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import LandingPage from './components/LandingPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import ClubsPage from './components/ClubsPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import Navigation from './components/Navigation.jsx'
import LoginPage from './components/LoginPage.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import ClubDashboard from './components/ClubDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ClubEditForm from './components/ClubEditForm.jsx'
import ClubCreateForm from './components/ClubCreateForm.jsx'
import MembershipFormPage from './components/MembershipFormPage.jsx'

// Import all club pages
import AnushaktiRoyals from './components/clubs/AnushaktiRoyals.jsx'
import Belapur from './components/clubs/Belapur.jsx'
import Chembur from './components/clubs/Chembur.jsx'
import ChemburGalaxy from './components/clubs/ChemburGalaxy.jsx'
import Dronagiri from './components/clubs/Dronagiri.jsx'
import GirlsInPearls from './components/clubs/GirlsInPearls.jsx'
import NewPanvelSteelTown from './components/clubs/NewPanvelSteelTown.jsx'
import ShiningStar from './components/clubs/ShiningStar.jsx'
import ThaneAngels from './components/clubs/ThaneAngels.jsx'
import ThaneLakeCity from './components/clubs/ThaneLakeCity.jsx'
import ThaneStarsCity from './components/clubs/ThaneStarsCity.jsx'
import Uran from './components/clubs/Uran.jsx'
import VasantVihar from './components/clubs/VasantVihar.jsx'
import VashiNaviMumbai from './components/clubs/VashiNaviMumbai.jsx'
import VileParle from './components/clubs/VileParle.jsx'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navigation />
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
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/club-dashboard"
              element={
                <ProtectedRoute requireRole="club">
                  <ClubDashboard />
                </ProtectedRoute>
              }
            />

            {/* Club Edit/Create Routes */}
            <Route
              path="/admin-dashboard/create-club"
              element={
                <ProtectedRoute requireRole="admin">
                  <ClubCreateForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard/edit-club/:clubId"
              element={
                <ProtectedRoute requireRole="admin">
                  <ClubEditForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/club-dashboard/edit/:clubId"
              element={
                <ProtectedRoute requireRole="club">
                  <ClubEditForm />
                </ProtectedRoute>
              }
            />

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
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App