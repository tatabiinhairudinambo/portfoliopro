import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tagStyles = {
  'Design System': { color: '#A259FF', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
  'Figma': { color: '#A259FF', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 8c-2.2 0-4 1.8-4 4s1.8 4 4 4h4V8H4zM8 0C5.8 0 4 1.8 4 4h4V0H8zM16 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM20 0h-4v8h4c2.2 0 4-1.8 4-4s-1.8-4-4-4zM12 0H8v8h4V0z"/></svg> },
  'React': { color: '#61DAFB', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5"/><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.2" cx="12" cy="12"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)"/></g></svg> },
  'Storybook': { color: '#FF4785', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg> },
  'UX Research': { color: '#3B82F6', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
  'Prototyping': { color: '#EC4899', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
  'Next.js': { color: '#FFFFFF', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-3v-7.5h-3V16.5h-3v-9h9v9z"/></svg> },
  'Tailwind': { color: '#06B6D4', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.92 7.15 14.77 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.08 15 9.23 16.15 11.7 16.15c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.92 13.15 9.77 12 7 12z"/></svg> },
  'Dashboard': { color: '#F59E0B', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg> },
  'Data Viz': { color: '#F97316', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg> },
  'D3.js': { color: '#F97316', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> },
  'TypeScript': { color: '#3178C6', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
  'Mobile App': { color: '#10B981', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg> },
  'User Journey': { color: '#8B5CF6', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
  'Prototype': { color: '#EC4899', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
  'Brand Identity': { color: '#10B981', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.5-8v2H8v-2h.5zM16 8h-2v2h2V8zm-2 4h-2v2h2v-2zm4-4h-2v2h2v-2z"/></svg> },
  'Web Design': { color: '#F59E0B', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10z"/></svg> },
  'GSAP': { color: '#88CE02', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> },
  'Framer': { color: '#FF0055', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8H12l8 8H12v8l-8-8V8L12 0z"/></svg> },
  'AI/ML': { color: '#8B5CF6', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
  'Interaction Design': { color: '#EC4899', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6.08c1.66 0 2.99-1.34 2.99-3S14.66.08 13 .08 10 1.42 10 3s1.34 3.08 3 3.08zM13 7.9c-2.33 0-7 1.17-7 3.5V19h14v-7.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
  'WebGL': { color: '#049EF4', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="8.5" x2="22" y2="8.5"/></svg> },
  'Three.js': { color: '#049EF4', icon: <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/></svg> },
}

function TagPill({ tag }) {
  const style = tagStyles[tag] || { color: '#6C63FF', icon: null }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-medium rounded-md whitespace-nowrap"
      style={{ backgroundColor: `${style.color}15`, color: style.color, border: `1px solid ${style.color}25` }}
    >
      {style.icon}
      {tag}
    </span>
  )
}

const projects = [
  {
    title: 'Lumina',
    desc: 'Comprehensive design system for a fintech startup serving 50K+ users.',
    fullDesc: 'A complete design system overhaul for a rapidly growing fintech platform.',
    tags: ['Design System', 'Figma', 'React', 'Storybook'],
    category: 'Branding',
    image: 'http://unggah.web.id/Yth-t-bHCqg_.jpg',
    gradient: 'from-purple-600 to-indigo-600',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Vertex',
    desc: 'E-commerce platform redesign that drove a 34% increase in conversion.',
    fullDesc: 'A complete UX overhaul of an e-commerce platform serving 200K+ monthly visitors.',
    tags: ['UX Research', 'Prototyping', 'Next.js', 'Tailwind'],
    category: 'Web',
    image: 'https://picsum.photos/seed/vertex/800/600',
    gradient: 'from-emerald-500 to-teal-500',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Flux',
    desc: 'Real-time data dashboard for a logistics company.',
    fullDesc: 'A real-time logistics dashboard handling millions of data points daily.',
    tags: ['Dashboard', 'Data Viz', 'D3.js', 'TypeScript'],
    category: 'Data',
    image: 'https://picsum.photos/seed/flux/800/600',
    gradient: 'from-amber-500 to-orange-500',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Pulse',
    desc: 'Health & wellness app with 100K+ downloads.',
    fullDesc: 'A health and wellness mobile app that reached 100K downloads.',
    tags: ['Mobile App', 'User Journey', 'Figma', 'Prototype'],
    category: 'Mobile',
    image: 'https://picsum.photos/seed/pulse/800/600',
    gradient: 'from-red-500 to-rose-500',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Aether',
    desc: 'Brand identity and website for a sustainable tech company.',
    fullDesc: 'A complete brand identity project for a clean energy startup.',
    tags: ['Brand Identity', 'Web Design', 'GSAP', 'Framer'],
    category: 'Branding',
    image: 'https://picsum.photos/seed/aether/800/600',
    gradient: 'from-violet-500 to-purple-500',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Nova',
    desc: 'AI-powered creative tool with intelligent design suggestions.',
    fullDesc: 'An AI-powered design tool that intelligently suggests layouts and colors.',
    tags: ['AI/ML', 'Interaction Design', 'WebGL', 'Three.js'],
    category: 'Web',
    image: 'https://picsum.photos/seed/nova/800/600',
    gradient: 'from-blue-500 to-cyan-500',
    liveUrl: '#',
    githubUrl: '#',
  },
]

const categories = ['All', 'Web', 'Mobile', 'Branding', 'Data']

const stagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1, staggerDirection: 1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

const dirs = [
  { x: -100, y: 40, rotate: -4 },
  { x: 100, y: -30, rotate: 3 },
  { x: 0, y: 100, rotate: -2 },
  { x: -80, y: -40, rotate: 5 },
  { x: 80, y: 60, rotate: -3 },
  { x: 0, y: -80, rotate: 2 },
]

function cardFrom(i) {
  const d = dirs[i % dirs.length]
  return {
    hidden: { opacity: 0, x: d.x, y: d.y, rotate: d.rotate, scale: 0.7, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  }
}

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: -10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-2xl w-full max-h-[80vh] md:max-h-[90vh] overflow-y-auto bg-dark border-t md:border border-white/10 md:rounded-3xl rounded-t-3xl"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className={`h-40 md:h-72 bg-gradient-to-br ${project.gradient} relative`}>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover mix-blend-overlay opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
            <button onClick={onClose} className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-4 md:bottom-4 md:left-6">
              <span className="font-display text-2xl md:text-4xl font-bold text-white">{project.title}</span>
            </div>
          </div>
          <div className="p-4 md:p-8 space-y-3 md:space-y-5">
            <div className="flex flex-wrap gap-1 md:gap-2">
              {project.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
            <p className="text-white/60 text-xs md:text-base leading-relaxed">{project.fullDesc}</p>
            <div className="flex flex-wrap gap-2 md:gap-3 pt-1 md:pt-2">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs md:text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Preview
              </a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs md:text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Source Code
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
  )
}

export default function Portfolio({ active }) {
  const [filter, setFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter)

  return (
    <section id="portfolio" className="section-panel">
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="section-label">Portfolio</motion.p>
        <motion.h2 variants={fadeUp} className="section-title mb-6 md:mb-8">
          Selected works
        </motion.h2>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 md:px-4 py-1.5 md:py-2 text-[11px] md:text-sm font-medium rounded-full transition-all duration-300 ${
                filter === cat
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(108,99,255,0.3)]'
                  : 'bg-dark-200 text-white/40 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={cardFrom(i)}
              onClick={() => setSelectedProject(project)}
              className="group card overflow-hidden cursor-pointer"
            >
              <div className={`h-36 md:h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/10 transition-colors duration-500" />
                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                  <span className="text-white/80 font-display text-2xl md:text-3xl font-bold">0{i + 1}</span>
                </div>
                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-2 md:group-hover:translate-y-0 flex gap-2">
                  <span className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium">View Details</span>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-display text-base md:text-lg font-semibold text-white group-hover:text-accent transition-colors mb-1.5 md:mb-2">{project.title}</h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-medium bg-dark-300 rounded-md text-white/30">+{project.tags.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
