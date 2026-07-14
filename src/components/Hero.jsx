import { motion } from 'framer-motion'

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

const nameTop = {
  hidden: { y: '-120%', rotateX: -20, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const nameBottom = {
  hidden: { y: '120%', rotateX: 20, opacity: 0 },
  visible: {
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const nameRight = {
  hidden: { x: '120%', rotateZ: 5, opacity: 0 },
  visible: {
    x: 0,
    rotateZ: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const photoReveal = {
  hidden: { opacity: 0, x: 120, scale: 0.7, rotateY: 40 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Hero({ scrollTo }) {
  return (
    <section id="hero" className="section-panel relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-glow" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark" />
      </div>

      <motion.div
        className="container-custom flex flex-col justify-center relative z-10 h-full py-20"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-stretch justify-between w-full">
          <div className="flex flex-col justify-center flex-1 w-full mt-10 md:mt-0">
            <motion.h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.95] tracking-tight max-w-5xl perspective-1000">
              <span className="flex flex-col">
                <span className="inline-block overflow-hidden" style={{ perspective: '1000px' }}>
                  <motion.span variants={nameTop} className="inline-block">tatabiin</motion.span>
                </span>
                <span className="inline-block overflow-hidden" style={{ perspective: '1000px' }}>
                  <motion.span variants={nameBottom} className="inline-block text-gradient">hairudin</motion.span>
                </span>
                <span className="inline-block overflow-hidden" style={{ perspective: '1000px' }}>
                  <motion.span variants={nameRight} className="inline-block">ambo</motion.span>
                </span>
              </span>
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="font-display text-gradient text-xl sm:text-2xl md:text-3xl mt-6 md:mt-8 font-medium inline-block"
            >
              Freelance Full Stack Developer.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-base sm:text-lg md:text-xl max-w-xl mt-3 md:mt-4 leading-relaxed"
            >
              Saya membantu bisnis, UMKM, startup, dan mahasiswa membangun website, aplikasi web, sistem informasi, dashboard admin, integrasi API, Google Apps Script, hingga software kustom yang modern, aman, dan mudah dikembangkan.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-base sm:text-lg md:text-xl max-w-xl mt-3 md:mt-4 leading-relaxed"
            >
              Berkomitmen menghadirkan solusi digital yang cepat, berkualitas, dan sesuai kebutuhan setiap klien.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8 md:mt-10">
              <button onClick={() => scrollTo(3)} className="btn-primary">
                View Projects
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button onClick={() => scrollTo(6)} className="btn-outline">
                Get in Touch
              </button>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 flex flex-col items-center md:items-end mt-12 md:mt-0 w-full"
            variants={photoReveal}
          >
            <div className="flex flex-col w-64 md:w-80 lg:w-96 h-full">
              <div className="relative w-full flex-1 min-h-[24rem] rounded-2xl overflow-hidden border-4 border-accent/20 shadow-2xl">
                <img src="/profile.jpg" alt="tatabiin hairudin ambo" className="absolute inset-0 w-full h-full object-cover brightness-75 transition-all duration-500 hover:brightness-100" />
              </div>
              <motion.p
                variants={fadeUp}
                className="section-label mt-6 w-full px-1 text-justify [text-align-last:justify]"
              >
                UI/UX Designer & Creative Developer
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="absolute bottom-8 md:bottom-12 right-6 flex items-center gap-3 text-white/30"
      >
        <span className="w-12 h-px bg-white/20" />
        <span className="text-xs tracking-[0.2em] uppercase">Scroll to explore</span>
      </motion.div>
    </section>
  )
}
