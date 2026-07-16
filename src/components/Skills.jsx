import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Design',
    color: 'purple',
    skills: [
      { name: 'Figma', level: 95, color: '#A259FF', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 8c-2.2 0-4 1.8-4 4s1.8 4 4 4h4V8H4zM8 0C5.8 0 4 1.8 4 4h4V0H8zM16 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM20 0h-4v8h4c2.2 0 4-1.8 4-4s-1.8-4-4-4zM12 0H8v8h4V0z"/></svg> },
      { name: 'Adobe Creative Suite', level: 88, color: '#FF0000', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 18.5L3 24V0l6.5 5.5V18.5zM14.5 18.5L21 24V0l-6.5 5.5V18.5z"/></svg> },
      { name: 'Spline', level: 75, color: '#8B5CF6', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#0A0A0F"/></svg> },
      { name: 'Blender', level: 65, color: '#EA7600', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> },
    ],
  },
  {
    title: 'Frontend',
    color: 'blue',
    skills: [
      { name: 'React / Next.js', level: 92, color: '#61DAFB', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2.5"/><g fill="none" stroke="currentColor" strokeWidth="1"><ellipse rx="11" ry="4.2" cx="12" cy="12"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(60 12 12)"/><ellipse rx="11" ry="4.2" cx="12" cy="12" transform="rotate(120 12 12)"/></g></svg> },
      { name: 'TypeScript', level: 88, color: '#3178C6', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 011.306.34v2.458a3.95 3.95 0 00-.643-.361 5.093 5.093 0 00-.717-.26 5.453 5.453 0 00-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 00-.623.242c-.17.104-.3.229-.393.374a.888.888 0 00-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 01-1.012 1.085 4.38 4.38 0 01-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 01-1.84-.164 5.544 5.544 0 01-1.512-.493v-2.63a5.033 5.033 0 003.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 00-.074-1.089 2.12 2.12 0 00-.537-.5 5.597 5.597 0 00-.807-.444 27.72 27.72 0 00-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 011.47-.629 7.536 7.536 0 011.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg> },
      { name: 'Tailwind CSS', level: 95, color: '#06B6D4', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.13 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.92 7.15 14.77 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.08 15 9.23 16.15 11.7 16.15c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.92 13.15 9.77 12 7 12z"/></svg> },
      { name: 'Framer Motion', level: 82, color: '#FF0055', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 0h16v8H12l8 8H12v8l-8-8V8L12 0z"/></svg> },
    ],
  },
  {
    title: 'Motion & Creative',
    color: 'green',
    skills: [
      { name: 'GSAP / ScrollTrigger', level: 85, color: '#88CE02', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> },
      { name: 'WebGL / Three.js', level: 70, color: '#049EF4', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="8.5" x2="22" y2="8.5"/></svg> },
      { name: 'After Effects', level: 78, color: '#9999FF', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="3"/><text x="12" y="16" textAnchor="middle" fill="#0A0A0F" fontSize="10" fontWeight="bold">Ae</text></svg> },
      { name: 'Lottie', level: 72, color: '#00DDB3', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
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
    filter: 'blur(6px)',
    transition: { duration: 0.4 },
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
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
  return (
    <section id="skills" className="section-panel">
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="section-label">Skills & Expertise</motion.p>
        <motion.h2 variants={fadeUp} className="section-title mb-6 md:mb-12">
          Tools I wield
        </motion.h2>

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
      </motion.div>
    </section>
  )
}
