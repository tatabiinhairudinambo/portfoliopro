import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    title: 'Lumina',
    desc: 'Comprehensive design system for a fintech startup serving 50K+ users.',
    fullDesc: 'A complete design system overhaul for a rapidly growing fintech platform.',
    tags: ['Design System', 'Figma', 'React', 'Storybook'],
    category: 'Branding',
    image: 'https://picsum.photos/seed/lumina/800/600',
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
          className="max-w-2xl w-full max-h-[85vh] md:max-h-[90vh] overflow-y-auto bg-dark border-t md:border border-white/10 md:rounded-3xl rounded-t-3xl"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className={`h-44 md:h-72 bg-gradient-to-br ${project.gradient} relative`}>
            <img src={project.image} alt={project.title} className="w-full h-full object-cover mix-blend-overlay opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
            <button onClick={onClose} className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-5 md:bottom-4 md:left-6">
              <span className="font-display text-3xl md:text-4xl font-bold text-white">{project.title}</span>
            </div>
          </div>
          <div className="p-5 md:p-8 space-y-4 md:space-y-5">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 md:px-3 py-1 text-[11px] md:text-xs font-medium bg-dark-300 rounded-full text-white/50">{tag}</span>
              ))}
            </div>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">{project.fullDesc}</p>
            <div className="flex flex-wrap gap-2.5 md:gap-3 pt-2">
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
                <img src={project.image} alt={project.title} className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/10 transition-colors duration-500" />
                <div className="absolute top-3 left-3 md:top-4 md:left-4">
                  <span className="text-white/80 font-display text-2xl md:text-3xl font-bold">0{i + 1}</span>
                </div>
                <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">View Details</span>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h3 className="font-display text-base md:text-lg font-semibold text-white group-hover:text-accent transition-colors mb-1.5 md:mb-2">{project.title}</h3>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-medium bg-dark-300 rounded-md text-white/40">{tag}</span>
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
