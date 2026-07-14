import { motion } from 'framer-motion'

const stagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
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

const fromLeft = {
  hidden: { opacity: 0, x: -140, skewX: 5, filter: 'blur(4px)', transition: { duration: 0.6 } },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const fromRight = {
  hidden: { opacity: 0, x: 140, skewX: -5, filter: 'blur(4px)', transition: { duration: 0.6 } },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const statFlip = (i) => ({
  hidden: { opacity: 0, y: 60, rotateX: 50, scale: 0.8, transition: { duration: 0.4 } },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
})

const stats = [
  { number: '6+', label: 'Years Experience' },
  { number: '50+', label: 'Projects Delivered' },
  { number: '30+', label: 'Happy Clients' },
  { number: '15+', label: 'Countries Reached' },
]

export default function About({ active }) {
  return (
    <section id="about" className="section-panel">
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="section-label">About Me</motion.p>

        <motion.h2 variants={fadeUp} className="section-title mb-8 md:mb-12">
          Design & code,<br />
          <span className="text-gradient">perfectly balanced.</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <motion.div variants={fromLeft} className="space-y-5">
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              With over 6 years of experience in digital design and development, 
              I specialize in creating user-centric interfaces that balance aesthetic 
              excellence with functional performance.
            </p>
            <p className="text-white/40 text-base leading-relaxed">
              I've had the privilege of working with startups and established brands 
              alike — from early-stage product design to full-scale design systems — 
              helping teams translate their vision into compelling digital products 
              that users love.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['Design Systems', 'UI/UX', 'Frontend', 'Prototyping', 'Brand Identity'].map((tag) => (
                <span key={tag} className="px-4 py-2 text-xs font-medium bg-dark-200 border border-white/5 rounded-full text-white/50">
                  {tag}
                </span>
              ))}
            </div>
            <a href="/resume.pdf" download className="btn-outline inline-flex mt-4 ml-4 md:ml-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </motion.div>

          <motion.div variants={fromRight} className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={statFlip(i)}
                className="card p-6 md:p-8 text-center"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.number}</div>
                <div className="text-white/40 text-xs md:text-sm">{stat.label}</div>
              </motion.div>
            ))}
            <motion.div
              variants={statFlip(4)}
              className="col-span-2 card p-6 md:p-8 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-white">Available for work</div>
                <div className="text-white/40 text-xs">Freelance & full-time projects</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
