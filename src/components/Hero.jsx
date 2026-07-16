import { useState } from 'react'
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

const slideLeft = {
  hidden: { x: '-100vw', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] } },
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
    <section id="hero" className="section-panel relative overflow-hidden bg-dark flex items-center justify-center">
      
      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-glow" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="absolute top-8 right-6 md:top-12 md:right-12 z-40 hidden md:flex items-center text-white/70">
        <span className="w-16 h-[1px] bg-white/50 mr-2"></span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>

      {/* Layer 1: Solid Text (Background) */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none overflow-hidden">
        <motion.h1 
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-[18vw] md:text-[18vw] leading-none tracking-tighter uppercase whitespace-nowrap text-center w-full -translate-y-16 md:-translate-y-24"
        >
          <span className="text-white/5">PORT</span><span className="text-blue-500/10">FOLIO</span>
        </motion.h1>
      </div>

      {/* Layer 2 - Centered Image */}
      <motion.div 
        variants={photoReveal}
        animate="visible"
        className="relative flex flex-col items-center justify-center z-40 pointer-events-none mt-16 md:mt-0 md:pr-10 lg:pr-0 [@media(max-height:800px)]:scale-90 [@media(max-height:650px)]:scale-75 [@media(max-height:500px)]:scale-50 origin-center transition-transform"
      >
        <motion.div 
          className="relative flex flex-col items-center pointer-events-auto -mt-8 md:-mt-24 cursor-pointer"
          style={{ transformOrigin: 'top center' }}
          animate={{ rotate: [-2.5, 2.5, -2.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          {/* The 3D Flipping Container (Strings + Clip + Card) */}
          <div className="relative w-44 sm:w-56 md:w-72 lg:w-80 perspective-[1000px] z-10 flex flex-col items-center">
            <motion.div 
              className="w-full relative flex flex-col items-center"
              animate={{ rotateY: [0, 180, 180, 0, 0] }}
              transition={{ repeat: Infinity, duration: 10, times: [0, 0.1, 0.5, 0.6, 1], ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* The Strings */}
              <div className="relative w-10 md:w-20 h-10 md:h-20 flex justify-center z-0 pointer-events-none" style={{ transform: 'translateZ(-2px)' }}>
                <div className="absolute -top-8 left-1 md:left-2 w-1 md:w-1.5 h-20 md:h-40 bg-[#1a1a1a] origin-top-left -rotate-[15deg] shadow-[inset_-1px_0_2px_rgba(255,255,255,0.2)] rounded-full z-0"></div>
                <div className="absolute -top-8 right-1 md:right-2 w-1 md:w-1.5 h-20 md:h-40 bg-[#1a1a1a] origin-top-right rotate-[15deg] shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)] rounded-full z-0"></div>
              </div>
              {/* The Modern Metal Clip */}
              <div className="relative w-5 h-8 md:w-6 md:h-10 flex flex-col items-center z-30" style={{ transform: 'translateZ(10px)' }}>
                 <div className="w-4 md:w-5 h-2.5 md:h-3 bg-gradient-to-r from-gray-500 via-gray-300 to-gray-600 rounded-t-md shadow-md"></div>
                 <div className="w-2.5 md:w-3 h-4 md:h-5 bg-gradient-to-b from-gray-400 to-gray-500 shadow-sm border-x border-gray-400/50"></div>
                 <div className="w-3.5 md:w-4 h-3 md:h-3.5 border-[2.5px] border-gray-400 rounded-b-full shadow-sm mt-[-1px]"></div>
              </div>

              {/* The Card */}
              <div className="relative w-full h-[20rem] sm:h-[24rem] md:h-[34rem] -mt-1 md:-mt-2" style={{ transformStyle: 'preserve-3d' }}>
                 {/* FRONT FACE */}
                 <div className="absolute inset-0 bg-dark rounded-[1.25rem] md:rounded-[1.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border border-accent/40" style={{ backfaceVisibility: 'hidden' }}>
                    <img 
                      src="/profile.jpg" 
                      alt="tatabiin hairudin ambo" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    />
                    <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-dark to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent"></div>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-dark/60 rounded-full shadow-inner z-20 backdrop-blur-sm border border-white/20"></div>
                    <div className="absolute top-8 md:top-10 inset-x-0 flex justify-center z-20">
                       <h3 className="text-white/90 font-display font-bold text-[10px] sm:text-xs md:text-base tracking-widest uppercase drop-shadow-md">
                         Tatabiin Hairudin Ambo
                       </h3>
                    </div>
                 </div>

                 {/* BACK FACE */}
                 <div className="absolute inset-0 bg-dark rounded-[1.25rem] md:rounded-[1.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border border-accent/40" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                    <img 
                      src="/belakang.jpg?v=2" 
                      alt="ID Card Back" 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                    />
                    <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-dark to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark to-transparent"></div>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-dark/60 rounded-full shadow-inner z-20 backdrop-blur-sm border border-white/20"></div>
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Title */}
        <h2 className="font-body text-sm sm:text-lg md:text-2xl mt-3 md:mt-6 font-light tracking-wide text-center pointer-events-auto px-4">
          <span className="text-white/50">Freelance Full</span> <span className="text-accent">Stack Developer.</span>
        </h2>

        {/* Running Text */}
        <div className="w-full max-w-[90vw] md:max-w-2xl mt-2 md:mt-3 overflow-hidden pointer-events-auto relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            <p className="text-white/90 font-body text-[11px] sm:text-sm md:text-base font-light tracking-wide pr-10">
              Saya membantu bisnis, UMKM, startup, dan mahasiswa membangun website, aplikasi web, sistem informasi, dashboard admin, integrasi API, Google Apps Script, hingga software kustom yang modern, aman, dan mudah dikembangkan.
            </p>
            <p className="text-white/90 font-body text-[11px] sm:text-sm md:text-base font-light tracking-wide pr-10">
              Saya membantu bisnis, UMKM, startup, dan mahasiswa membangun website, aplikasi web, sistem informasi, dashboard admin, integrasi API, Google Apps Script, hingga software kustom yang modern, aman, dan mudah dikembangkan.
            </p>
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div variants={fadeUp} className="flex gap-3 md:gap-4 mt-4 md:mt-6 pointer-events-auto px-6 w-full justify-center">
          <button onClick={() => scrollTo(3)} className="btn-primary shadow-lg text-xs sm:text-sm md:text-base px-4 py-2.5 md:px-6 md:py-3 flex items-center gap-2">
            View Projects
            <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button onClick={() => scrollTo(6)} className="btn-outline bg-dark-200/50 backdrop-blur-md text-xs sm:text-sm md:text-base px-4 py-2.5 md:px-6 md:py-3">
            Contact Me
          </button>
        </motion.div>

        {/* Scroll to explore */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center gap-1.5 mt-4 md:mt-10 text-white/30 z-40 pointer-events-none"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-center">Scroll to explore</span>
          <span className="w-px h-5 sm:h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Layer 3 - Outlined Text (Foreground) */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none select-none overflow-hidden">
        <motion.h1 
          variants={slideLeft}
          initial="hidden"
          animate="visible"
          className="font-display font-black text-[18vw] md:text-[18vw] leading-none tracking-tighter uppercase whitespace-nowrap text-center w-full -translate-y-16 md:-translate-y-24"
          style={{ color: 'transparent' }}
        >
          <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>PORT</span><span style={{ WebkitTextStroke: '2px rgba(59,130,246,0.6)' }}>FOLIO</span>
        </motion.h1>
      </div>

    </section>
  )
}
