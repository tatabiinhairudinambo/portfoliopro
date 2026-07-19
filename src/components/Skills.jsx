import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollAnimation from './ScrollAnimation'
import { FaQuoteLeft } from 'react-icons/fa'
import { GitHubCalendar } from 'react-github-calendar'



const skillCategories = [
  {
    title: 'Design UI/UX',
    color: 'purple',
    skills: [
      { name: 'Figma', level: 95, color: '#A259FF', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 8c-2.2 0-4 1.8-4 4s1.8 4 4 4h4V8H4zM8 0C5.8 0 4 1.8 4 4h4V0H8zM16 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM20 0h-4v8h4c2.2 0 4-1.8 4-4s-1.8-4-4-4zM12 0H8v8h4V0z"/></svg> },
      { name: 'Adobe Creative Suite', level: 88, color: '#FF0000', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 18.5L3 24V0l6.5 5.5V18.5zM14.5 18.5L21 24V0l-6.5 5.5V18.5z"/></svg> },
      { name: 'Stich With Goggle', level: 75, color: '#8B5CF6', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#0A0A0F"/></svg> },
      { name: 'Adobe Photoshop', level: 65, color: '#EA7600', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> },
    ],
  },
  {
    title: 'Frontend',
    color: 'blue',
    skills: [
      { name: 'React / Next.js', level: 92, color: '#61DAFB', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5"/><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.2" cx="12" cy="12"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)"/></g></svg> },
      { name: 'HTML & CSS', level: 88, color: '#E34F26', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 6 2 12 8 18"></polyline><polyline points="16 6 22 12 16 18"></polyline><line x1="14" y1="4" x2="10" y2="20"></line></svg> },
      { name: 'Tailwind CSS', level: 95, color: '#06B6D4', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.92 7.15 14.77 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.08 15 9.23 16.15 11.7 16.15c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.92 13.15 9.77 12 7 12z"/></svg> },
      { name: 'Framer Motion', level: 82, color: '#FF0055', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8H12l8 8H12v8l-8-8V8L12 0z"/></svg> },
    ],
  },
  {
    title: 'Backend',
    color: 'green',
    skills: [
      { name: 'Node.js', level: 90, color: '#88CE02', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> },
      { name: 'Express.js', level: 85, color: '#049EF4', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="8.5" x2="22" y2="8.5"/></svg> },
      { name: 'React Native', level: 82, color: '#61DAFB', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="3"/><text x="12" y="16" textAnchor="middle" fill="#0A0A0F" fontSize="10" fontWeight="bold">RN</text></svg> },
      { name: 'Laravel', level: 88, color: '#FF2D20', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
    ],
  },
]

const stagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1, staggerDirection: 1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const cardFlip3D = (i) => ({
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: 50,
    scale: 0.7,
    transition: { duration: 0.4 },
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

function SkillBar({ name, level, color, icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span style={{ color }} className="flex-shrink-0">{icon}</span>
          <span className="text-xs md:text-sm font-medium text-white/70 group-hover:text-white transition-colors">{name}</span>
        </div>
        <span className="text-[11px] md:text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-dark-300 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(to right, ${color}, ${color}88)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills({ active }) {
  const [selectedYear, setSelectedYear] = useState(2024)

  return (
    <ScrollAnimation id="skills" className="section-panel" direction="up" duration={0.8}>
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        <motion.div variants={fadeUp} className="flex flex-col w-full mb-6 md:mb-8">
          <p className="section-label !mb-2">Skills & Expertise</p>
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full" style={{ animation: 'gradientRotate 2s linear infinite' }}></div>
        </motion.div>
        <div className="relative pl-6 mb-6 md:mb-12">
          <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent bg-[length:100%_200%] opacity-80 rounded-full" style={{ animation: 'gradientRotateVertical 2s linear infinite' }}></div>
          <motion.h2 variants={fadeUp} className="section-title !mb-0">
            Alat yang Saya Gunakan
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 perspective-1000">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              custom={i}
              variants={cardFlip3D(i)}
              className="card p-5 md:p-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="text-accent font-display font-bold text-xs md:text-sm">0{i + 1}</span>
                </div>
                <h3 className="font-display text-base md:text-lg font-semibold text-white">{cat.title}</h3>
              </div>
              <div className="space-y-4 md:space-y-5">
                {cat.skills.map((skill, j) => (
                  <SkillBar key={skill.name} index={j} {...skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="w-full flex justify-center mt-8 md:mt-12 mb-2">
          <div className="h-[2px] w-full max-w-4xl bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full" style={{ animation: 'gradientRotate 3s linear infinite' }}></div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-4 md:mt-6 flex flex-col items-center justify-center text-center relative w-full overflow-x-auto">
          <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-4">GitHub Contributions</h3>
          <div className="card p-6 md:p-8 w-full flex flex-col items-center relative">
            
            <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-center">
              <div className="w-full overflow-x-auto custom-scrollbar flex justify-center text-xs md:text-sm">
                <GitHubCalendar 
                  username="tatabiinhairudinambo" 
                  year={selectedYear}
                  colorScheme="dark"
                  theme={{
                    dark: ['#161B22', '#0e4429', '#006d32', '#26a641', '#39d353']
                  }}
                />
              </div>
              
              <div className="flex flex-row md:flex-col justify-center gap-2 md:w-24 shrink-0">
                {[2026, 2025, 2024].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all w-full text-center ${
                      selectedYear === year
                        ? 'bg-blue-500 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <a 
              href="https://github.com/tatabiinhairudinambo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 font-display text-white/60 hover:text-accent text-sm md:text-base font-medium transition-colors flex items-center gap-2"
            >
              Kunjungi GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
            <div className="h-[2px] w-32 mt-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent bg-[length:200%_100%] opacity-80 rounded-full" style={{ animation: 'gradientRotate 3s linear infinite' }}></div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 md:mt-8 flex justify-center text-center px-4">
          <p className="font-display text-white/50 text-sm md:text-base italic max-w-2xl">
            "Membangun solusi digital dengan fondasi yang kuat, menggabungkan desain UI/UX yang intuitif, serta pengembangan kode yang responsif dan andal."
          </p>
        </motion.div>
      </motion.div>
    </ScrollAnimation>
  )
}
