import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Hero from './components/Hero'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Portfolio />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/life" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}