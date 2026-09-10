import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectCategories, projects } from '../data/site'
import ParallaxSection from './ParallaxSection'
import { fadeUp, stagger, viewport } from '../lib/motion'

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 bg-[#080808]/90"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full max-h-[86vh] overflow-y-auto bg-[#080808] border border-[#232323]"
        style={{ borderRadius: 2 }}
      >
        <div className="card-media border-b border-[#232323] p-4">
          <img src={project.image} alt={project.title} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFFFFF] text-[#080808]"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-6 md:p-8 space-y-4">
          <p className="section-label">Selected work</p>
          <h3 className="display-kicker">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[var(--muted)]">{project.fullDesc}</p>
          {project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Live preview
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((p) => (Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter))

  return (
    <>
    <ParallaxSection id="portfolio">
      <div className="container-page">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <motion.p variants={fadeUp} className="section-label mb-3">Selected work</motion.p>
          <motion.h2 variants={fadeUp} className="display-title max-w-2xl">Karya yang dibangun dengan niat.</motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-[var(--muted)]">
            Beberapa proyek unggulan — dari aplikasi bisnis hingga eksplorasi desain — dengan fokus pada solusi yang jelas dan berguna.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="flex flex-wrap gap-2 mt-8 mb-10"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-[16px] rounded-full duration-[220ms] ${
                filter === cat ? 'bg-[#FFFFFF] text-[#080808]' : 'bg-transparent text-[var(--muted)] border border-[#232323] hover:text-[var(--text)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelected(project)}
                className="group cursor-pointer transition-transform duration-[220ms] ease-token hover:-translate-y-0.5"
              >
                <div className="card-media border border-[#232323] p-3" style={{ borderRadius: 2 }}>
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="pt-4">
                  <p className="section-label mb-1">0{i + 1}</p>
                  <h3 className="display-kicker group-hover:text-[var(--muted)] transition-colors duration-[220ms]">
                    {project.title}
                  </h3>
                  <p className="text-[16px] text-[var(--muted)] mt-1 line-clamp-2">{project.desc}</p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </ParallaxSection>
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
