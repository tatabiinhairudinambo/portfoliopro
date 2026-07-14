import { motion } from 'framer-motion'

const experience = [
  {
    period: '2022 — Present',
    role: 'Senior UI/UX Designer',
    company: 'Design Studio Co.',
    desc: 'Lead design strategy for enterprise clients. Managing a team of 4 designers and establishing design system standards.',
    type: 'work',
  },
  {
    period: '2020 — 2022',
    role: 'UI/UX Designer',
    company: 'TechVentures Inc.',
    desc: 'Designed and shipped 12+ products across web and mobile. Improved user retention by 40% through UX research initiatives.',
    type: 'work',
  },
  {
    period: '2018 — 2020',
    role: 'Junior Designer',
    company: 'CreativeLab Agency',
    desc: 'Built websites and brand identities for 20+ clients. Mastered the fundamentals of design thinking and rapid prototyping.',
    type: 'work',
  },
  {
    period: '2014 — 2018',
    role: 'BFA in Graphic Design',
    company: 'California Institute of the Arts',
    desc: 'Graduated with honors. Specialized in interaction design and new media art.',
    type: 'education',
  },
]

const stagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1, staggerDirection: 1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const timelineSlide = (i) => ({
  hidden: { opacity: 0, x: -80, scale: 0.9, filter: 'blur(4px)', transition: { duration: 0.4 } },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.15 + 0.5,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

const dotPulse = {
  hidden: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function Experience({ active }) {
  return (
    <section id="experience" className="section-panel">
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="section-label">Experience</motion.p>
        <motion.h2 variants={fadeUp} className="section-title mb-8 md:mb-12">
          Career timeline
        </motion.h2>

        <motion.div variants={fadeUp} className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={active ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute left-0 md:left-6 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-accent via-accent/50 to-transparent"
          />

          <div className="space-y-8 md:space-y-10 pl-6 md:pl-16">
            {experience.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={timelineSlide(i)}
                initial="hidden"
                animate={active ? 'visible' : 'hidden'}
                className="relative group"
              >
                <motion.div
                  variants={dotPulse}
                  className={`absolute -left-[25px] md:-left-[34px] top-1 w-3 h-3 rounded-full border-2 ${
                    item.type === 'education'
                      ? 'border-accent bg-accent/20'
                      : 'border-accent bg-dark'
                  } group-hover:bg-accent transition-colors duration-300`}
                  style={{ boxShadow: '0 0 10px rgba(108,99,255,0.3)' }}
                />

                <div className="card p-5 md:p-6">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <div>
                      <span className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.type === 'education'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {item.type === 'education' ? 'Education' : 'Work'}
                      </span>
                    </div>
                    <span className="text-accent/60 text-xs md:text-sm font-mono">{item.period}</span>
                  </div>
                  <h3 className="font-display text-base md:text-lg font-semibold text-white mt-2">{item.role}</h3>
                  <p className="text-accent/80 text-sm md:text-base font-medium mb-2">{item.company}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
