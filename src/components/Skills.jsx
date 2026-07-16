import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Design',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Adobe Creative Suite', level: 88 },
      { name: 'Spline', level: 75 },
      { name: 'Blender', level: 65 },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 82 },
    ],
  },
  {
    title: 'Motion & Creative',
    skills: [
      { name: 'GSAP / ScrollTrigger', level: 85 },
      { name: 'WebGL / Three.js', level: 70 },
      { name: 'After Effects', level: 78 },
      { name: 'Lottie', level: 72 },
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

function SkillBar({ name, level, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{name}</span>
        <span className="text-xs text-accent font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-dark-300 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12, duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full relative"
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
                  <SkillBar key={skill.name} {...skill} index={j} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
