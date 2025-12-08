import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import ClubsPage from './components/ClubsPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import Navigation from './components/Navigation.jsx'

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
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/contact" element={<ContactPage />} />

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
  )
}

export default App