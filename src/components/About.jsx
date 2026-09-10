import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../data/site'
import ParallaxSection from './ParallaxSection'
import { fadeLeft, fadeRight, fadeUp, stagger, viewport } from '../lib/motion'

export default function About() {
  const [slide, setSlide] = useState(0)
  const members = site.teamMembers

  useEffect(() => {
    const timer = setInterval(() => setSlide((prev) => (prev + 1) % members.length), 4000)
    return () => clearInterval(timer)
  }, [members.length])

  return (
    <ParallaxSection id="about">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">About</p>
          <h2 className="display-title max-w-2xl">{site.headline}</h2>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="space-y-5 text-[var(--muted)]"
          >
            {site.bio.map((p) => (
              <motion.p key={p.slice(0, 24)} variants={fadeLeft}>
                {p}
              </motion.p>
            ))}

            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {site.stats.map((stat) => (
                <div key={stat.label} className="card-cozy p-4">
                  <p className="display-kicker">{stat.number}</p>
                  <p className="text-xs text-[var(--muted)] mt-1 leading-snug">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="overflow-hidden pt-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <motion.div
                className="flex gap-2 w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
              >
                {[...site.skillTags, ...site.skillTags].map((tag, i) => (
                  <span key={`${tag}-${i}`} className="chip whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeRight} className="overflow-visible">
            <p className="display-kicker mb-4">
              Team <span className="text-[var(--muted)]">{site.team}</span>
            </p>
            <p className="text-[16px] text-[var(--muted)] mb-5 max-w-sm">“{site.quote}”</p>
            <div className="profile-card">
              {members[slide].layout === 'full' ? (
                <div className="card-media p-3">
                  <img src={members[slide].photo} alt={members[slide].name} />
                </div>
              ) : (
                <>
                  <div className="profile-banner">
                    <img src={members[slide].photo} alt="" />
                  </div>
                  <div className="profile-avatar">
                    <img src={members[slide].photo} alt={members[slide].name} />
                  </div>
                </>
              )}
              <button
                onClick={() => setSlide((prev) => (prev === 0 ? members.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#000] text-[#E8E8E2] border border-[#232323]"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={() => setSlide((prev) => (prev + 1) % members.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#000] text-[#E8E8E2] border border-[#232323]"
                aria-label="Next"
              >
                ›
              </button>
              <div className="profile-body" style={members[slide].layout === 'full' ? { paddingTop: 16 } : undefined}>
                <p className="text-[20px] font-medium text-[var(--text)] leading-tight">{members[slide].name}</p>
                <p className="mt-2 text-[15px] text-[var(--muted)] leading-snug">{members[slide].role}</p>
                <p className="mt-2 text-[14px] text-[var(--muted)]">{members[slide].location}</p>
                {members[slide].org && (
                  <p className="mt-3 text-[14px] text-[var(--text)]">{members[slide].org}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
                <a
                  href={site.teamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-fit px-4 py-1.5 text-[13px]"
                >
                  Kunjungi situs kami
                </a>
              </div>
          </motion.div>
        </div>
      </div>
    </ParallaxSection>
  )
}
