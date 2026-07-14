import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Alex redesigned our entire platform and the results were incredible. Our user engagement went up 40% in the first month. Exceptional designer with a rare blend of creativity and technical understanding.",
    name: 'Sarah Chen',
    role: 'CTO, TechVentures Inc.',
    initials: 'SC',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    quote: "Working with Alex was a game-changer for our brand. The design system they built saved us months of development time and brought consistency across all our products.",
    name: 'Marcus Johnson',
    role: 'Product Lead, Lumina Fintech',
    initials: 'MJ',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    quote: "The most talented designer I've had the pleasure of working with. Alex doesn't just make things look beautiful — they understand the strategy behind every pixel.",
    name: 'Elena Voss',
    role: 'CEO, Design Studio Co.',
    initials: 'EV',
    color: 'from-amber-500 to-orange-500',
  },
]

const stagger = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1, staggerDirection: 1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const card3DEntrance = [
  {
    hidden: { opacity: 0, scale: 0.6, rotate: -12, y: 60, rotateY: -30, filter: 'blur(6px)', transition: { duration: 0.4 } },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  {
    hidden: { opacity: 0, scale: 0.6, rotate: 10, y: 60, rotateY: 30, filter: 'blur(6px)', transition: { duration: 0.4 } },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  {
    hidden: { opacity: 0, scale: 0.6, rotate: -8, y: 80, rotateY: -20, filter: 'blur(6px)', transition: { duration: 0.4 } },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
]

export default function Testimonials({ active }) {
  return (
    <section id="testimonials" className="section-panel">
      <motion.div
        className="container-custom flex flex-col justify-center"
        variants={stagger}
        initial="hidden"
        animate={active ? 'visible' : 'hidden'}
      >
        <motion.p variants={fadeUp} className="section-label">Testimonials</motion.p>
        <motion.h2 variants={fadeUp} className="section-title mb-8 md:mb-12">
          What people say
        </motion.h2>

        <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-4 md:gap-6" style={{ perspective: '1200px' }}>
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={card3DEntrance[i]}
              className="card p-6 md:p-8 flex flex-col relative group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute top-4 right-4 text-accent/10 text-6xl font-display font-bold leading-none select-none">&ldquo;</div>
              <div className="flex-1">
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6 relative z-10">{item.quote}</p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-bold">{item.initials}</span>
                </div>
                <div>
                  <div className="font-display text-sm font-semibold text-white">{item.name}</div>
                  <div className="text-white/30 text-xs">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
