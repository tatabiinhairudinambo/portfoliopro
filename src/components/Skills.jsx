import { useState } from 'react'
import { motion } from 'framer-motion'
import { GitHubCalendar } from 'react-github-calendar'
import { site, skillCategories } from '../data/site'
import ParallaxSection from './ParallaxSection'
import { fadeUp, viewport } from '../lib/motion'

function SkillBar({ name, level, index }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-[var(--text)]">{name}</span>
        <span className="text-[var(--muted)] font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#232323] overflow-hidden" style={{ borderRadius: 2 }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="h-full bg-[#F2F2F2]"
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const [year, setYear] = useState(2024)

  return (
    <ParallaxSection id="skills">
      <div className="container-page">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <p className="section-label mb-3">Skills & tools</p>
          <h2 className="display-title">Alat yang saya gunakan</h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ delay: i * 0.08, duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="card-cozy p-6 md:p-8"
            >
              <p className="section-label mb-2">0{i + 1}</p>
              <h3 className="display-kicker mb-6">{cat.title}</h3>
              <div className="space-y-5">
                {cat.skills.map((skill, j) => (
                  <SkillBar key={skill.name} index={j} {...skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="card-cozy mt-10 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="display-kicker">GitHub contributions</h3>
            <div className="flex gap-2">
              {[2026, 2025, 2024].map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-3 py-1.5 rounded-full text-[16px] ${
                    year === y ? 'bg-[#FFFFFF] text-[#080808]' : 'bg-transparent text-[var(--muted)] border border-[#232323]'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto flex justify-center">
            <GitHubCalendar
              username={site.githubUser}
              year={year}
              colorScheme="dark"
              theme={{
                dark: ['#141414', '#232323', '#858582', '#B5B5AF', '#F2F2F2'],
              }}
            />
          </div>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex mt-6 text-[16px]">
            Kunjungi GitHub →
          </a>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
