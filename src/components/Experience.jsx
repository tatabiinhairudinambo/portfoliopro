import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experience } from '../data/site'
import ParallaxSection from './ParallaxSection'
import { fadeUp, viewport } from '../lib/motion'

function ExperienceModal({ item, onClose }) {
  if (!item) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#080808]/90"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[#080808] border border-[#232323]"
        style={{ borderRadius: 2 }}
      >
        <div className="card-media border-b border-[#232323] p-4">
          <img src={item.image} alt={item.details} />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFFFFF] text-[#080808]" aria-label="Close">
            ×
          </button>
        </div>
        <div className="p-6 md:p-8 space-y-4">
          <span className="section-label">
            {item.type === 'education' ? 'Pendidikan' : 'Pekerjaan'} • {item.period}
          </span>
          <h3 className="display-kicker">{item.role}</h3>
          <p className="text-[var(--text)]">{item.company}</p>
          <p className="text-[var(--muted)]">{item.desc}</p>
          <div className="card-cozy p-4">
            <p className="text-[16px] text-[var(--text)]">{item.details}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const [selected, setSelected] = useState(null)

  return (
    <>
    <ParallaxSection id="experience">
      <div className="container-page">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <p className="section-label mb-3">Experience</p>
          <h2 className="display-title">Perjalanan karier</h2>
        </motion.div>

        <div className="mt-12 relative">
          <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-px bg-[#232323]" />
          <div className="space-y-6">
            {experience.map((item, i) => (
              <motion.button
                key={`${item.role}-${item.company}`}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ delay: i * 0.08, duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setSelected(item)}
                className="relative w-full text-left pl-10 md:pl-14"
              >
                <span className="absolute left-1.5 md:left-2.5 top-5 w-3 h-3 rounded-full bg-[#F2F2F2] border-4 border-[#080808]" />
                <div className="card-cozy p-5 md:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="section-label">
                      {item.type === 'education' ? 'Pendidikan' : 'Pekerjaan'}
                    </span>
                    <span className="text-[16px] text-[var(--muted)]">{item.period}</span>
                  </div>
                  <h3 className="display-kicker">{item.role}</h3>
                  <p className="text-[var(--text)] mt-1">{item.company}</p>
                  <p className="text-[16px] text-[var(--muted)] mt-2">{item.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

    </ParallaxSection>
      <AnimatePresence>
        {selected && <ExperienceModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}
