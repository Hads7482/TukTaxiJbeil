/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navi from './components/Navi'
import Footy from './components/Footy'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import OurClients from './pages/OurClients'
import Servecies from './pages/Servecies'
import Team from './pages/Team'

function App() {
  const location = useLocation()

  return (
    <div>
      <Navi />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/our-clients" element={<OurClients />} />
            <Route path="/services" element={<Servecies />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footy />
    </div>
  )
}

export default App